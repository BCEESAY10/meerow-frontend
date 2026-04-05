import React, { useState } from "react";
import type { Comment } from "../../types/comment.types";
import { useDeleteComment } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import { formatRelativeTime } from "../../utils/formatDate";

interface CommentItemProps {
  comment: Comment;
  contentId: string;
  contentType: "story" | "episode";
  onDelete?: () => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  contentId,
  contentType,
  onDelete,
}) => {
  const { user } = useAuth();
  const deleteCommentMutation = useDeleteComment(contentId, contentType);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthor = user?.id === comment.user_id;

  // Check if comment was edited
  const wasEdited =
    comment.updated_at &&
    new Date(comment.updated_at).getTime() >
      new Date(comment.created_at).getTime() + 1000; // 1 second tolerance

  const handleDelete = async () => {
    setError(null);
    setIsDeleting(true);

    try {
      await deleteCommentMutation.mutateAsync(comment.id);
      onDelete?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete comment");
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition">
      {/* Comment Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {comment.user && (
            <>
              <div className="w-10 h-10 rounded-full bg-[#E8622A] dark:bg-[#F07A3D] flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {comment.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-[#1E1E2E] dark:text-[#FDF6EE] text-sm">
                  {comment.user.name}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8]">
                    {formatRelativeTime(comment.created_at)}
                  </p>
                  {wasEdited && (
                    <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8] italic">
                      (edited {formatRelativeTime(comment.updated_at)})
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {isAuthor && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-[#6B6B7D] dark:text-[#B8B8C8] hover:text-red-600 dark:hover:text-red-400 transition text-sm font-medium disabled:opacity-50">
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>

      {/* Comment Content */}
      <p className="text-[#1E1E2E] dark:text-[#FDF6EE] text-sm mb-2 leading-relaxed">
        {comment.body}
      </p>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
};
