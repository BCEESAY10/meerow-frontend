/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { Comment } from "../../types/comment.types";
import { CommentItem } from "./CommentItem";
import { useCreateComment } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";
import { Spinner } from "../common/Spinner";

const MAX_COMMENT_LENGTH = 5000;
const COMMENTS_PER_PAGE = 10;

interface CommentSectionProps {
  contentId: string;
  contentType: "story" | "episode";
  comments?: Comment[];
  isLoadingComments?: boolean;
  onCommentAdded?: () => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalComments?: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  contentId,
  contentType,
  comments = [],
  isLoadingComments = false,
  onCommentAdded,
  onPageChange,
  currentPage = 1,
  totalComments = 0,
}) => {
  const { user } = useAuth();
  const createCommentMutation = useCreateComment(contentId, contentType);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deletedCommentIds, setDeletedCommentIds] = useState<Set<string>>(
    new Set(),
  );

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!commentText.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if (commentText.length > MAX_COMMENT_LENGTH) {
      setError(
        `Comment exceeds maximum length of ${MAX_COMMENT_LENGTH} characters`,
      );
      return;
    }

    if (!user) {
      setError("Please log in to comment");
      return;
    }

    try {
      await createCommentMutation.mutateAsync(commentText.trim());
      setCommentText("");
      onCommentAdded?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to post comment");
    }
  };

  const visibleComments = comments.filter(
    (comment) => !deletedCommentIds.has(comment.id),
  );

  const totalPages = Math.ceil(
    Math.max(totalComments, visibleComments.length) / COMMENTS_PER_PAGE,
  );

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
        Comments ({totalComments > 0 ? totalComments : visibleComments.length})
      </h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE]">
                Add a Comment
              </label>
              <span
                className={`text-xs font-medium ${
                  commentText.length > MAX_COMMENT_LENGTH * 0.9
                    ? "text-red-600 dark:text-red-400"
                    : "text-[#6B6B7D] dark:text-[#B8B8C8]"
                }`}>
                {commentText.length} / {MAX_COMMENT_LENGTH}
              </span>
            </div>
            <textarea
              value={commentText}
              onChange={(e) => {
                if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                  setCommentText(e.target.value);
                }
              }}
              placeholder="Share your thoughts..."
              rows={3}
              maxLength={MAX_COMMENT_LENGTH}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] focus:border-transparent transition duration-200"
            />
            {commentText.length > MAX_COMMENT_LENGTH * 0.9 && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {MAX_COMMENT_LENGTH - commentText.length} characters remaining
              </p>
            )}
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={createCommentMutation.isPending}
            disabled={
              !commentText.trim() ||
              commentText.length > MAX_COMMENT_LENGTH ||
              createCommentMutation.isPending
            }>
            Post Comment
          </Button>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-[#2A2A3E] rounded-lg p-6 text-center">
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-4">
            Please{" "}
            <a
              href="/login"
              className="text-[#E8622A] dark:text-[#F07A3D] hover:underline font-medium">
              log in
            </a>{" "}
            to post a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      {isLoadingComments ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : visibleComments.length > 0 ? (
        <>
          <div className="space-y-4">
            {visibleComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                contentId={contentId}
                contentType={contentType}
                onDelete={() => {
                  setDeletedCommentIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.add(comment.id);
                    return newSet;
                  });
                }}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] bg-gray-100 dark:bg-[#2A2A3E] rounded-lg hover:bg-gray-200 dark:hover:bg-[#333346] disabled:opacity-50 disabled:cursor-not-allowed transition">
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => onPageChange?.(page)}
                      className={`w-8 h-8 text-sm font-medium rounded-lg transition ${
                        currentPage === page
                          ? "bg-[#E8622A] dark:bg-[#F07A3D] text-white"
                          : "text-[#1E1E2E] dark:text-[#FDF6EE] bg-gray-100 dark:bg-[#2A2A3E] hover:bg-gray-200 dark:hover:bg-[#333346]"
                      }`}>
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() =>
                  onPageChange?.(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] bg-gray-100 dark:bg-[#2A2A3E] rounded-lg hover:bg-gray-200 dark:hover:bg-[#333346] disabled:opacity-50 disabled:cursor-not-allowed transition">
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 dark:bg-[#2A2A3E] rounded-lg p-8 text-center">
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            No comments yet. Be the first to comment!
          </p>
        </div>
      )}
    </div>
  );
};
