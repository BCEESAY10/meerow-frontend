/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { Comment } from "../../types/comment.types";
import { CommentItem } from "./CommentItem";
import { useCreateComment } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";
import { Spinner } from "../common/Spinner";

interface CommentSectionProps {
  contentId: string;
  contentType: "story" | "episode";
  comments?: Comment[];
  isLoadingComments?: boolean;
  onCommentAdded?: () => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  contentId,
  contentType,
  comments = [],
  isLoadingComments = false,
  onCommentAdded,
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

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
        Comments ({visibleComments.length})
      </h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Add a Comment
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] focus:border-transparent transition duration-200"
            />
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
            disabled={!commentText.trim() || createCommentMutation.isPending}>
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
