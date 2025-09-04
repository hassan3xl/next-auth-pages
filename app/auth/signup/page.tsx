"use client";

import { useState } from "react";
import { User, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/input/InputField";
import HeroSection from "@/components/auth/HeroSection";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  //   const router = useRouter();

  //   const backToLogin = () => {
  //     router.push("/auth/login");
  //   };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = passwordStrength(formData.password);

  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ] as const;

  const strengthTexts = ["Weak", "Fair", "Good", "Strong"] as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
            <div className="grid grid-cols-2 gap-4">
              <InputField
                icon={User}
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <InputField
                icon={User}
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            {/* Password */}
            <div>
              <InputField
                icon={Lock}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-2 w-full rounded ${
                          i < strength
                            ? strengthColors[strength - 1]
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-sm ${
                      strength > 0
                        ? `text-${
                            strengthColors[strength - 1].split("-")[1]
                          }-600`
                        : "text-gray-500"
                    }`}
                  >
                    Password strength:{" "}
                    {strength > 0 ? strengthTexts[strength - 1] : "Too weak"}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <InputField
              icon={Lock}
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword
                  ? "Passwords don't match"
                  : ""
              }
              required
            />

            {/* Agree to terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
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

            {/* Submit button */}
            <Button
              type="submit"
              loading={loading}
              icon={<ArrowRight />}
              className="w-full"
              disabled={!formData.agreeToTerms}
            >
              Create Account
            </Button>
          </form>

          {/* Switch to login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                // onClick={backToLogin}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                <Link href="/auth/login">Sign in</Link>
              </button>
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
