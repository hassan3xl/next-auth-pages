"use client";

import { useState } from "react";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import HeroSection from "@/components/auth/HeroSection";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginPageProps {}

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginFormErrors = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC<LoginPageProps> = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("Login attempt:", formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      <HeroSection
        title="Welcome Back!"
        subtitle="Sign in to access your account and continue your journey with us"
        image={<User size={80} className="text-white/80" />}
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
              required
            />

            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>

              <button
                type="button"
                onClick={resetPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              loading={loading}
              icon={<ArrowRight />}
              className="w-full"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account yet?{" "}
              <button
                // onClick={backToLogin}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                <Link href="/auth/login">Sign Up</Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
