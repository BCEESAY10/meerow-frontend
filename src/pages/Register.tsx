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
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    agreed_to_terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        agreed_to_terms: data.agreed_to_terms,
      });

      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate("/");
      } else {
        setServerError(response.message || "Registration failed");
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
              Join Meerow
            </h1>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              Start sharing your stories with the world
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

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              error={errors.name?.message}
            />

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
              helperText="At least 6 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                id="terms"
                {...register("agreed_to_terms")}
                className="mt-1 w-4 h-4 text-primary dark:text-primary-light rounded"
              />
              <label
                htmlFor="terms"
                className="text-sm text-text-light dark:text-text-light">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-primary dark:text-primary-light hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary dark:text-primary-light hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreed_to_terms && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                {errors.agreed_to_terms.message}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={isLoading || !isValid}
              className="w-full">
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-secondary"></div>
            <span className="text-text-light dark:text-text-light text-sm">
              or
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-secondary"></div>
          </div>

          {/* Google Sign Up (placeholder) */}
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
            Sign Up with Google
          </Button>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#E8622A] dark:text-[#F07A3D] hover:underline font-semibold cursor-pointer">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Register;
