import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/auth.service";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate("/");
      } else {
        setServerError(response.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📖</div>
            <h1 className="text-3xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              Sign in to continue to Meerow
            </p>
          </div>

          {/* Error Message */}
          {serverError && (
            <div className="mb-6">
              <ErrorMessage
                message={serverError}
                onDismiss={() => setServerError(null)}
              />
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
              className="w-full">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-[#3A3A52]"></div>
            <span className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm">
              or
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-[#3A3A52]"></div>
          </div>

          {/* Google Sign In (placeholder) */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            disabled>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <text x="0" y="20" font-size="20" fill="#E8622A">
                G
              </text>
            </svg>
            Sign In with Google
          </Button>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#E8622A] dark:text-[#F07A3D] hover:underline font-semibold cursor-pointer">
                Sign up
              </Link>
            </p>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm">
              <a
                href="#"
                className="text-[#E8622A] dark:text-[#F07A3D] hover:underline cursor-pointer">
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
