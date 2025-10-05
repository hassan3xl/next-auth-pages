"use client";

import { useState } from "react";
import { User, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/auth/HeroSection";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiService } from "@/services/apiService";
import { handleLogin } from "@/lib/actions";
import { InputField } from "@/components/input/InputField";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);

    const payload = {
      // firstName: formData.get("firstName") as string,
      // lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password1: formData.get("password1") as string,
      password2: formData.get("password2") as string,
      agreeToTerms: formData.get("agreeToTerms") === "on",
    };

    if (payload.password1 !== payload.password2) {
      setErrors({ confirmPassword: "Passwords don't match" });
      setLoading(false);
      return;
    }

    if (!payload.agreeToTerms) {
      setErrors({ general: "You must agree to the terms to continue." });
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.post("api/auth/signup/", payload);

      if (response.access) {
        // Redirect after successful signup
        handleLogin(response.user.id, response.access, response.refresh);

        router.push("/dashbaord");
      } else {
        const tmpErrors: Record<string, string> = {};
        Object.entries(response).forEach(([key, value]) => {
          tmpErrors[key] = String(value);
        });
        setErrors(tmpErrors);
      }
    } catch (err: any) {
      setErrors({ general: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join us today and start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First & last name */}
            {/* <div className="grid grid-cols-2 gap-4">
              <InputField
                icon={User}
                name="firstName"
                placeholder="First name"
                required
              />
              <InputField
                icon={User}
                name="lastName"
                placeholder="Last name"
                required
              />
            </div> */}

            {/* Email */}
            <InputField
              field="input"
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email address"
              required
            />

            {/* Password */}
            <InputField
              field="input"
              icon={Lock}
              type="password"
              name="password1"
              placeholder="Password"
              required
            />

            {/* Confirm password */}
            <InputField
              icon={Lock}
              type="password"
              name="password2"
              placeholder="Confirm password"
              error={errors.confirmPassword}
              required
            />

            {/* Agree to terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Privacy Policy
                </button>
              </span>
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              loading={loading}
              icon={<ArrowRight />}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Switch to login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side hero */}
      <HeroSection
        title="Join Our Community"
        subtitle="Create your account and unlock amazing features tailored just for you"
        image={<Shield size={80} className="text-white/80" />}
      />
    </div>
  );
};

export default SignupPage;
