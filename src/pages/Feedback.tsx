import React, { useState } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/common/Button";
import { Spinner } from "../components/common/Spinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { useAuth } from "../hooks/useAuth";
import {
  useFeedbacks,
  useCreateFeedback,
  useDeleteFeedback,
} from "../hooks/useFeedbacks";
import { formatDate } from "../utils/formatDate";
import type { CreateFeedbackInput } from "../types/feedback.types";

export const Feedback: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { data: feedbacksData, isLoading, error } = useFeedbacks(1, 20);
  const createFeedback = useCreateFeedback();
  const deleteFeedback = useDeleteFeedback();

  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [submitError, setSubmitError] = useState("");

  const feedbacks = feedbacksData?.data
    ? Array.isArray(feedbacksData.data)
      ? feedbacksData.data
      : "feedbacks" in feedbacksData.data
        ? feedbacksData.data.feedbacks
        : []
    : [];

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!feedbackText.trim()) {
      setSubmitError("Please write some feedback");
      return;
    }

    try {
      const payload: CreateFeedbackInput = {
        body: feedbackText,
        rating: rating || undefined,
      };

      await createFeedback.mutateAsync(payload);
      setFeedbackText("");
      setRating(undefined);
    } catch (err) {
      setSubmitError("Failed to submit feedback. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteFeedback = (feedbackId: string) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      deleteFeedback.mutate(feedbackId);
    }
  };

  const renderStars = (rdx: number | undefined) => {
    if (!rdx) return null;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rdx
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <PageWrapper>
      <div className="py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
          Feedback
        </h1>
        <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-12">
          Help us improve Meerow by sharing your thoughts and suggestions.
        </p>

        {/* Feedback Form */}
        {isAuthenticated ? (
          <div className="bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52] p-8 mb-12">
            <h2 className="text-xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-6">
              Share Your Feedback
            </h2>

            {submitError && <ErrorMessage message={submitError} />}

            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-3">
                  Rating (Optional)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-colors ${
                        star <= (rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600 hover:text-yellow-300"
                      }`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-3">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us what you think..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#3A3A52] bg-white dark:bg-[#1E1E2E] text-[#1E1E2E] dark:text-[#FDF6EE] placeholder-[#9B9BAC] dark:placeholder-[#7A7A8C] focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] resize-none"
                  rows={5}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createFeedback.isPending}>
                  {createFeedback.isPending
                    ? "Submitting..."
                    : "Submit Feedback"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFeedbackText("");
                    setRating(undefined);
                    setSubmitError("");
                  }}>
                  Clear
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
            <p className="text-blue-800 dark:text-blue-300">
              Please{" "}
              <a
                href="/login"
                className="font-semibold underline hover:text-blue-600 dark:hover:text-blue-400">
                log in
              </a>{" "}
              to submit feedback.
            </p>
          </div>
        )}

        {/* Feedbacks List */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-6">
            Community Feedback ({feedbacks.length})
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : error ? (
            <ErrorMessage message="Failed to load feedbacks. Please try again." />
          ) : feedbacks.length === 0 ? (
            <EmptyState
              icon="💬"
              title="No feedbacks yet"
              description="Be the first to share your thoughts!"
            />
          ) : (
            <div className="space-y-6">
              {feedbacks.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                        {entry.user?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-[#9B9BAC] dark:text-[#7A7A8C]">
                        {formatDate(entry.created_at)}
                      </p>
                    </div>
                    {isAuthenticated && user?.id === entry.user_id && (
                      <button
                        onClick={() => handleDeleteFeedback(entry.id)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium"
                        disabled={deleteFeedback.isPending}>
                        Delete
                      </button>
                    )}
                  </div>

                  {entry.rating && (
                    <div className="mb-3">{renderStars(entry.rating)}</div>
                  )}

                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
                    {entry.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Feedback;
