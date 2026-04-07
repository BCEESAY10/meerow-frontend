import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Button } from "../common/Button";

interface ConfirmDrawerProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "default";
}

export const ConfirmDrawer: React.FC<ConfirmDrawerProps> = ({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
  variant = "default",
}) => {
  return (
    <Drawer
      open={isOpen}
      onClose={onCancel}
      direction="top"
      className="h-auto! max-h-[40vh]! bg-white dark:bg-[#1E1E2E]"
      style={{
        width: "100%",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <div className="p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-8 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="min-w-32">
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
            className="min-w-32">
            {confirmText}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
