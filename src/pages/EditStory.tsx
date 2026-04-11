/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { Spinner } from "../components/common/Spinner";
import { ConfirmDrawer } from "../components/modals/ConfirmDrawer";
import { RichTextEditor } from "../components/common/RichTextEditor";
import { useStoryBySlug, useUpdateStory } from "../hooks/useStories";
import { useEpisodes, useDeleteEpisode } from "../hooks/useEpisodes";
import { useAuth } from "../hooks/useAuth";
import { GENRES, GENRE_LIST } from "../utils/constants";
import type { Genre } from "../types/story.types";

const storySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  synopsis: z.string().min(10, "Synopsis must be at least 10 characters"),
  genre: z.enum(GENRE_LIST),
  content: z.string().optional(),
});

type StoryFormData = z.infer<typeof storySchema>;

export const EditStory: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch the story using storyId (which is the story's slug internally)
  const { data: storyData, isLoading: isLoadingStory } = useStoryBySlug(
    storyId || "",
  );
  const { data: episodesData, isLoading: isLoadingEpisodes } =
    useEpisodes(storyId);
  const updateStoryMutation = useUpdateStory();
  const deleteEpisodeMutation = useDeleteEpisode(storyId || "");

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [episodeToDelete, setEpisodeToDelete] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
  });

  // Populate form with story data
  useEffect(() => {
    if (storyData?.data) {
      const story = storyData.data;

      // Check if user is the author
      if (user?.id !== story.author_id) {
        // User is not authorized - return early
        return;
      }

      setValue("title", story.title);
      setValue("synopsis", story.synopsis || "");
      setValue("genre", story.genre);
      if (story.content) {
        setValue("content", story.content);
        setContent(story.content);
      }
    }
  }, [storyData, user, setValue]);

  const onSubmit: SubmitHandler<StoryFormData> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);

    if (!storyId) {
      setServerError("Story ID is missing");
      return;
    }

    try {
      const updatePayload = {
        title: data.title,
        synopsis: data.synopsis,
        genre: data.genre as Genre,
        ...(data.content ? { content: data.content } : {}),
      };

      await updateStoryMutation.mutateAsync({
        id: storyId,
        data: updatePayload,
      });

      setSuccessMessage(`"${data.title}" has been updated successfully!`);

      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/author-dashboard");
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update story";
      setServerError(errorMessage);
    }
  };

  const handleDeleteEpisode = async (episodeId: string) => {
    setDeleteError(null);
    try {
      await deleteEpisodeMutation.mutateAsync(episodeId);
      setEpisodeToDelete(null);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete episode";
      setDeleteError(errorMsg);
    }
  };

  if (isLoadingStory) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      </PageWrapper>
    );
  }

  if (!storyData?.data) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <ErrorMessage
            message={serverError || "Story not found"}
            onDismiss={() => navigate("/author-dashboard")}
          />
        </div>
      </PageWrapper>
    );
  }

  const story = storyData.data;

  // Check if user is the author
  if (user?.id !== story.author_id) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <ErrorMessage
            message="You are not authorized to edit this story"
            onDismiss={() => navigate("/author-dashboard")}
          />
        </div>
      </PageWrapper>
    );
  }

  // Episodic stories cannot edit base content (only via episodes)
  const canEditContent = !story.is_episodic;

  return (
    <PageWrapper>
      <div className="py-12 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            Edit Story
          </h1>
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            Update your story details and content.
          </p>
        </div>

        {serverError && (
          <div className="mb-6">
            <ErrorMessage
              message={serverError}
              onDismiss={() => setServerError(null)}
            />
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-600/20 border border-green-200 dark:border-green-500/40 rounded-lg">
            <p className="text-green-800 dark:text-green-300 text-sm">
              ✓ {successMessage}
            </p>
            <p className="text-green-700 dark:text-green-400 text-xs mt-2">
              Redirecting to your dashboard...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <Input
            label="Story Title"
            type="text"
            placeholder="Enter a captivating title"
            {...register("title")}
            error={errors.title?.message}
          />

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Genre
            </label>
            <select
              {...register("genre")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE] focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] focus:border-transparent transition cursor-pointer">
              <option value="">Select a genre</option>
              {Object.entries(GENRES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Synopsis
            </label>
            <textarea
              {...register("synopsis")}
              placeholder="Brief description of your story"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] focus:border-transparent transition duration-200"
            />
            {errors.synopsis && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.synopsis.message}
              </p>
            )}
          </div>

          {/* Content (only for non-episodic) */}
          {canEditContent && (
            <RichTextEditor
              value={content}
              onChange={setContent}
              label="Story Content"
              placeholder="Write your complete story here..."
              minHeight="350px"
            />
          )}

          {!canEditContent && (
            <div className="p-4 bg-[#FDF6EE] dark:bg-[#2A2A3E] border border-[#E8622A]/20 dark:border-[#F07A3D]/20 rounded-lg mb-6">
              <p className="text-[#1E1E2E] dark:text-[#FDF6EE] text-sm">
                <strong>Episodic series:</strong> You can only edit the series
                title, synopsis, and genre here. Edit episode content below.
              </p>
            </div>
          )}

          {!canEditContent && episodesData?.data && (
            <div>
              <h2 className="text-2xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
                Episodes
              </h2>

              {deleteError && (
                <div className="mb-4">
                  <ErrorMessage
                    message={deleteError}
                    onDismiss={() => setDeleteError(null)}
                  />
                </div>
              )}

              {isLoadingEpisodes ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : episodesData.data.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-[#2A2A3E] rounded-lg">
                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
                    No episodes yet
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/story/${storyId}/write-episode`)}
                    className="mt-4">
                    + Add First Episode
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {episodesData.data.map((episode) => (
                    <div
                      key={episode.id}
                      className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2A2A3E] hover:bg-gray-50 dark:hover:bg-[#3A3A4E] transition">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1E1E2E] dark:text-[#FDF6EE]">
                          Episode {episode.episode_number}: {episode.title}
                        </h3>
                        <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8] mt-1">
                          {episode.content
                            ? `${episode.content.split(" ").length} words`
                            : "No content"}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/story/${storyId}/episode/${episode.id}/edit`,
                            )
                          }>
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEpisodeToDelete(episode.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/story/${storyId}/write-episode`)}
                    className="w-full mt-4">
                    + Add Episode
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={updateStoryMutation.isPending}
              disabled={updateStoryMutation.isPending || !!successMessage}
              className="flex-1">
              {successMessage ? "Redirecting..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
              disabled={!!successMessage}
              className="flex-1">
              Cancel
            </Button>
          </div>
        </form>

        {/* Delete Episode Confirmation */}
        {episodeToDelete && (
          <ConfirmDrawer
            isOpen={!!episodeToDelete}
            title="Delete Episode"
            description="Are you sure you want to delete this episode? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            isLoading={deleteEpisodeMutation.isPending}
            variant="danger"
            onConfirm={() => handleDeleteEpisode(episodeToDelete)}
            onCancel={() => setEpisodeToDelete(null)}
          />
        )}
      </div>
    </PageWrapper>
  );
};
