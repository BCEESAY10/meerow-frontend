/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useLike, useUnlike } from "../../hooks/useLikes";
import { useAuth } from "../../hooks/useAuth";

interface LikeButtonProps {
  contentId: string;
  contentType: "story" | "episode" | "comment";
  initialLiked?: boolean;
  initialCount?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  contentId,
  contentType,
  initialLiked = false,
  initialCount = 0,
}) => {
  const { user } = useAuth();
  const likeType = contentType === "comment" ? "story" : contentType;
  const likeMutation = useLike(likeType as "story" | "episode");
  const unlikeMutation = useUnlike(likeType as "story" | "episode");
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [error, setError] = useState<string | null>(null);

  const isLoading = likeMutation.isPending || unlikeMutation.isPending;

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setError("Please log in to like this content");
      return;
    }

    setError(null);

    try {
      if (isLiked) {
        // Unlike
        await unlikeMutation.mutateAsync(contentId);
        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        // Like
        await likeMutation.mutateAsync(contentId);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update like");
      // Revert state on error
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount + 1 : Math.max(0, likeCount - 1));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLikeClick}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
          isLiked
            ? "bg-[#E8622A] dark:bg-[#F07A3D] text-white"
            : "bg-gray-100 dark:bg-[#2A2A3E] text-[#6B6B7D] dark:text-[#B8B8C8] hover:bg-gray-200 dark:hover:bg-[#333346]"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        )}
        <span className="text-sm font-medium">{likeCount}</span>
      </button>

      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
};
