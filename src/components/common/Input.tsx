import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-4 py-2.5 border border-gray-300 rounded-lg cursor-text
          bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE]
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D]
          focus:border-transparent transition duration-200
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
      />
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};
