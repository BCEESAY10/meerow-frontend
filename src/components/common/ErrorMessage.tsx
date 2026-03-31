import React from "react";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
}) => {
  return (
    <div className="w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="text-red-600 dark:text-red-400 text-lg">⚠️</span>
        <p className="text-red-800 dark:text-red-200 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          ✕
        </button>
      )}
    </div>
  );
};
