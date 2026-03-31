import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeStyles = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`
          ${sizeStyles[size]}
          border-gray-300 dark:border-[#3A3A52]
          border-t-[#E8622A] dark:border-t-[#F07A3D]
          rounded-full animate-spin
        `}
      />
    </div>
  );
};
