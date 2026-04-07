/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useQueueItem,
  useApproveContent,
  useRejectContent,
} from "../../hooks/useAdmin";
import { Spinner } from "../../components/common/Spinner";
import { Button } from "../../components/common/Button";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/common/Badge";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { formatDate } from "../../utils/formatDate";

const MAX_REJECTION_LENGTH = 1000;
const MIN_REJECTION_LENGTH = 5;

export const AdminReview: React.FC = () => {
  const { type, id } = useParams<{ type: "story" | "episode"; id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQueueItem(type, id);
  const approveContent = useApproveContent();
  const rejectContent = useRejectContent();

  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState<string | null>(null);
  const [showRejectForm, setShowRejectForm] = useState(false);

  const queueItem = data?.data;

  const handleApprove = async () => {
    if (!type || !id) return;

    try {
      await approveContent.mutateAsync({ type, id });
      navigate("/admin/queue");
    } catch (err: any) {
      console.error("Approval failed:", err);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    setRejectionError(null);

    // Validation
    if (!rejectionReason.trim()) {
      setRejectionError("Rejection reason is required");
      return;
    }

    if (rejectionReason.length < MIN_REJECTION_LENGTH) {
      setRejectionError(
        `Rejection reason must be at least ${MIN_REJECTION_LENGTH} characters`,
      );
      return;
    }

    if (rejectionReason.length > MAX_REJECTION_LENGTH) {
      setRejectionError(
        `Rejection reason must not exceed ${MAX_REJECTION_LENGTH} characters`,
      );
      return;
    }

    if (!type || !id) return;

    try {
      await rejectContent.mutateAsync({
        type,
        id,
        reason: rejectionReason.trim(),
      });
      navigate("/admin/queue");
    } catch (err: any) {
      setRejectionError(
        err.response?.data?.message || "Failed to reject content",
      );
    }
  };

  if (!type || !id) {
    return (
      <PageWrapper>
        <ErrorMessage message="Invalid content type or ID" />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header & Navigation */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigate("/admin/queue")}
            className="text-[#E8622A] dark:text-[#F07A3D] hover:underline font-medium">
            ← Back to Queue
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <ErrorMessage message="Failed to load content for review" />
        ) : !queueItem ? (
          <ErrorMessage message="Content not found" />
        ) : (
          <>
            {/* Content Details */}
            <div className="bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="warning">
                      {type === "story" ? "Story" : "Episode"}
                    </Badge>
                    {type === "episode" && (
                      <Badge variant="info">
                        Episode {(queueItem as any).episode_number}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
                    {queueItem.title}
                  </h1>
                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mt-2">
                    by {queueItem.author?.name || "Unknown Author"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8] uppercase font-medium">
                    Submitted
                  </p>
                  <p className="text-sm text-[#1E1E2E] dark:text-[#FDF6EE] mt-1">
                    {formatDate(queueItem.created_at)}
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-gray-50 dark:bg-[#2A2A3E] rounded-lg p-4 mb-6">
                <h3 className="font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
                  Author Information
                </h3>
                <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                  {queueItem.author?.email}
                </p>
                <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8] mt-1">
                  User ID: {queueItem.author_id}
                </p>
              </div>

              {/* Story/Episode Series Info */}
              {type === "episode" && (queueItem as any).story && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    <span className="font-medium">Series:</span>{" "}
                    {(queueItem as any).story.title}
                  </p>
                </div>
              )}

              {/* Genre (if story) */}
              {type === "story" && (queueItem as any).genre && (
                <div className="mb-6">
                  <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8] uppercase font-medium mb-1">
                    Genre
                  </p>
                  <p className="text-sm text-[#1E1E2E] dark:text-[#FDF6EE]">
                    {(queueItem as any).genre}
                  </p>
                </div>
              )}

              {/* Episodes List (if episodic story) */}
              {type === "story" &&
                (queueItem as any).episodes &&
                (queueItem as any).episodes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-3">
                      Submitted Episodes
                    </h3>
                    <div className="space-y-2">
                      {(queueItem as any).episodes.map(
                        (episode: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                            <Badge variant="info">
                              Ep {episode.episode_number}
                            </Badge>
                            <span>{episode.title}</span>
                            {episode.status === "pending" && (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Content Body */}
            <div className="bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
                Content
              </h2>
              <div className="prose dark:prose-invert prose-sm max-w-none">
                <div className="text-[#1E1E2E] dark:text-[#FDF6EE] whitespace-pre-wrap wrap-break-word text-sm leading-relaxed">
                  {queueItem.content}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!showRejectForm && (
                <div className="flex gap-4">
                  <Button
                    variant="primary"
                    onClick={handleApprove}
                    loading={approveContent.isPending}
                    disabled={
                      approveContent.isPending || rejectContent.isPending
                    }
                    text="Approve & Publish"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => setShowRejectForm(true)}
                    disabled={
                      approveContent.isPending || rejectContent.isPending
                    }
                    text="Reject Content"
                  />
                </div>
              )}

              {/* Rejection Form */}
              {showRejectForm && (
                <form
                  onSubmit={handleReject}
                  className="bg-gray-50 dark:bg-[#2A2A3E] border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                  <h3 className="font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
                    Provide Rejection Reason
                  </h3>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE]">
                        Reason for Rejection
                      </label>
                      <span
                        className={`text-xs font-medium ${
                          rejectionReason.length > MAX_REJECTION_LENGTH * 0.9
                            ? "text-red-600 dark:text-red-400"
                            : "text-[#6B6B7D] dark:text-[#B8B8C8]"
                        }`}>
                        {rejectionReason.length} / {MAX_REJECTION_LENGTH}
                      </span>
                    </div>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_REJECTION_LENGTH) {
                          setRejectionReason(e.target.value);
                        }
                      }}
                      placeholder="Explain why this content is being rejected..."
                      rows={4}
                      maxLength={MAX_REJECTION_LENGTH}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#1E1E2E] text-[#1E1E2E] dark:text-[#FDF6EE] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                    {rejectionReason.length > MAX_REJECTION_LENGTH * 0.9 && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {MAX_REJECTION_LENGTH - rejectionReason.length}{" "}
                        characters remaining
                      </p>
                    )}
                  </div>

                  {rejectionError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        {rejectionError}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      variant="danger"
                      loading={rejectContent.isPending}
                      disabled={
                        !rejectionReason.trim() ||
                        rejectionReason.length < MIN_REJECTION_LENGTH ||
                        rejectContent.isPending
                      }
                      text="Confirm Rejection"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectionError(null);
                      }}
                      disabled={rejectContent.isPending}
                      text="Cancel"
                    />
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default AdminReview;
