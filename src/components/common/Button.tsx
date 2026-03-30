import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FDF6EE] dark:focus:ring-offset-[#2A2A3E]";

  const variantStyles = {
    primary:
      "bg-[#E8622A] text-white hover:bg-[#D14E1A] active:scale-95 focus:ring-[#E8622A] dark:bg-[#F07A3D] dark:hover:bg-[#E8622A] dark:text-[#1E1E2E] dark:focus:ring-[#F07A3D]",
    secondary:
      "bg-[#1E1E2E] text-white hover:bg-[#0F0F1E] active:scale-95 focus:ring-[#1E1E2E] dark:bg-[#3A3A52] dark:hover:bg-[#1E1E2E] dark:text-[#FDF6EE] dark:focus:ring-[#3A3A52]",
    outline:
      "border-2 border-[#E8622A] text-[#E8622A] hover:bg-[#E8622A] hover:text-white active:scale-95 focus:ring-[#E8622A] dark:border-[#F07A3D] dark:text-[#F07A3D] dark:hover:bg-[#F07A3D] dark:hover:text-[#1E1E2E] dark:focus:ring-[#F07A3D]",
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const fullClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={fullClassName}
      type={props.type || "button"}>
      {loading && <span className="inline-block animate-spin">⏳</span>}
      {children}
    </button>
  );
};
