import React from "react";

interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "info",
  size = "md",
  children,
  className = "",
}) => {
  const variantStyles = {
    primary:
      "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light",
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs font-medium rounded",
    md: "px-3 py-1.5 text-sm font-medium rounded-lg",
  };

  return (
    <span
      className={`inline-block ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
