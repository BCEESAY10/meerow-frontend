import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Button } from "../common/Button";

interface RejectionReasonDrawerProps {
  isOpen: boolean;
  title: string;
  genre: string;
  rejectionReason: string;
  onClose: () => void;
}

export const RejectionReasonDrawer: React.FC<RejectionReasonDrawerProps> = ({
  isOpen,
  title,
  genre,
  rejectionReason,
  onClose,
}) => {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="top"
      size={500}
      style={{
        maxWidth: "500px",
        left: "50%",
        transform: "translateX(-50%)",
      }}>
      <div className="bg-white dark:bg-[#1E1E2E] p-8 h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onClose}
            className="text-[#6B6B7D] dark:text-[#B8B8C8] hover:text-[#1E1E2E] dark:hover:text-[#FDF6EE] text-sm font-medium mb-4">
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            {title}
          </h2>
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm">
            {genre}
          </p>
        </div>

        {/* Rejection Reason */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-[#E8622A] dark:text-[#F07A3D] uppercase tracking-wide mb-3">
            Review Feedback
          </h3>
          <div className="bg-red-50 dark:bg-red-950 border-l-4 border-red-500 dark:border-red-400 p-4 rounded">
            <p className="text-[#1E1E2E] dark:text-[#FDF6EE] leading-relaxed whitespace-pre-wrap">
              {rejectionReason}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 dark:bg-[#2A2A3E] p-4 rounded mb-8">
          <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
            Your story was not approved during moderation review. Please review
            the feedback above and consider making revisions before resubmitting.
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          onClick={onClose}
          className="w-full">
          Done
        </Button>
      </div>
    </Drawer>
  );
};
