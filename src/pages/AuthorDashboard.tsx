/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/common/Button";
import { Spinner } from "../components/common/Spinner";
import { Badge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { ConfirmDrawer } from "../components/modals/ConfirmDrawer";
import { RejectionReasonDrawer } from "../components/modals/RejectionReasonDrawer";
import { useAuth } from "../hooks/useAuth";
import { useUserStories, useDeleteStory } from "../hooks/useStories";
import { formatRelativeTime } from "../utils/formatDate";

export const AuthorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: storiesData, isLoading, refetch } = useUserStories();
  const deleteStoryMutation = useDeleteStory();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);
  const [selectedRejectedStory, setSelectedRejectedStory] = useState<{
    title: string;
    genre: string;
    rejectionReason: string;
  } | null>(null);

  if (!user) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            Please log in to view your dashboard
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/login")}
            className="mt-4">
            Log In
          </Button>
        </div>
      </PageWrapper>
    );
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      </PageWrapper>
    );
  }

  const stories = storiesData?.data || [];

  const handleDeleteStory = async (storyId: string) => {
    setErrorMessage(null);

    try {
      await deleteStoryMutation.mutateAsync(storyId);
      setStoryToDelete(null);
      refetch();
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete story";
      setErrorMessage(errorMsg);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">Published</Badge>;
      case "pending":
        return <Badge variant="warning">Pending Review</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="info">{status}</Badge>;
    }
  };

  const handleViewRejectionReason = (
    title: string,
    genre: string,
    rejectionReason?: string,
  ) => {
    if (rejectionReason) {
      setSelectedRejectedStory({ title, genre, rejectionReason });
    }
  };

  return (
    <PageWrapper>
      <div className="py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            My Stories
          </h1>
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-6">
            Manage your published and draft stories
          </p>

          <Button
            variant="primary"
            onClick={() => navigate("/write-story")}
            className="inline-flex items-center gap-2">
            + Write New Story
          </Button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6">
            <ErrorMessage
              message={errorMessage}
              onDismiss={() => setErrorMessage(null)}
            />
          </div>
        )}

        {/* Stories Table/List */}
        {stories.length > 0 ? (
          <div className="bg-white dark:bg-[#1E1E2E] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead className="bg-gray-50 dark:bg-[#2A2A3E] border-b border-gray-300 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                      Genre
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                      Published
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                  {stories.map((story) => (
                    <tr
                      key={story.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#2A2A3E] transition">
                      <td className="px-6 py-4 text-sm text-[#1E1E2E] dark:text-[#FDF6EE] font-medium">
                        <button
                          onClick={() => navigate(`/story/${story.slug}`)}
                          className="text-[#E8622A] dark:text-[#F07A3D] hover:underline cursor-pointer">
                          {story.title}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                        {story.genre}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {story.is_episodic ? (
                          <Badge variant="success">Series</Badge>
                        ) : (
                          <Badge variant="info">Standalone</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getStatusBadge(story.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                        {story.published_at
                          ? formatRelativeTime(story.published_at)
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/story/${story.id}/edit`)}>
                            Edit
                          </Button>

                          {story.status === "rejected" &&
                            story.rejection_reason && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleViewRejectionReason(
                                    story.title,
                                    story.genre,
                                    story.rejection_reason,
                                  )
                                }>
                                View Reason
                              </Button>
                            )}

                          {story.is_episodic && story.status === "approved" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                navigate(`/story/${story.id}/write-episode`)
                              }>
                              + Episode
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setStoryToDelete(story.id)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            icon="📝"
            title="No Stories Yet"
            description="Start writing your first story to share with our community"
            action={{
              label: "Write a Story",
              onClick: () => navigate("/write-story"),
            }}
          />
        )}

        {/* Rejection Reason Drawer */}
        {selectedRejectedStory && (
          <RejectionReasonDrawer
            isOpen={selectedRejectedStory !== null}
            title={selectedRejectedStory.title}
            genre={selectedRejectedStory.genre}
            rejectionReason={selectedRejectedStory.rejectionReason}
            onClose={() => setSelectedRejectedStory(null)}
          />
        )}
      </div>

      {/* Delete Confirmation Drawer */}
      <ConfirmDrawer
        isOpen={storyToDelete !== null}
        title="Delete Story?"
        description="This action cannot be undone. All episodes and comments will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={deleteStoryMutation.isPending}
        onConfirm={() => storyToDelete && handleDeleteStory(storyToDelete)}
        onCancel={() => setStoryToDelete(null)}
      />
    </PageWrapper>
  );
};
