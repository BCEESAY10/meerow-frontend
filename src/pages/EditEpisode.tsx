/* eslint-disable react-hooks/set-state-in-effect */
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
import { RichTextEditor } from "../components/common/RichTextEditor";
import { useStoryBySlug } from "../hooks/useStories";
import { useEpisode, useUpdateEpisode } from "../hooks/useEpisodes";
import { useAuth } from "../hooks/useAuth";

const episodeSchema = z.object({
  title: z.string().min(3, "Episode title must be at least 3 characters"),
});

type EpisodeFormData = z.infer<typeof episodeSchema>;

export const EditEpisode: React.FC = () => {
  const { storyId, episodeId } = useParams<{
    storyId: string;
    episodeId: string;
  }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch story to verify ownership
  const { data: storyData, isLoading: isLoadingStory } = useStoryBySlug(
    storyId || "",
  );

  // Fetch episode
  const { data: episodeData, isLoading: isLoadingEpisode } = useEpisode(
    storyId,
    episodeId,
  );

  const updateEpisodeMutation = useUpdateEpisode(
    storyId || "",
    episodeId || "",
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeSchema),
  });

  // Populate form with episode data
  useEffect(() => {
    if (episodeData?.data) {
      const episode = episodeData.data;
      setValue("title", episode.title);
      setContent(episode.content || "");
    }
  }, [episodeData, setValue]);

  if (!storyId || !episodeId) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            Story or episode not found
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (isLoadingStory || isLoadingEpisode) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      </PageWrapper>
    );
  }

  if (!storyData?.data || !episodeData?.data) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <ErrorMessage
            message="Story or episode not found"
            onDismiss={() => navigate("/author-dashboard")}
          />
        </div>
      </PageWrapper>
    );
  }

  const story = storyData.data;
  const episode = episodeData.data;

  // Check if user is the author
  if (user?.id !== story.author_id) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <ErrorMessage
            message="You are not authorized to edit this episode"
            onDismiss={() => navigate("/author-dashboard")}
          />
        </div>
      </PageWrapper>
    );
  }

  const onSubmit: SubmitHandler<EpisodeFormData> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);

    // Validate content
    if (!content || content.replace(/<[^>]*>/g, "").trim().length < 50) {
      setServerError("Episode content must be at least 50 characters");
      return;
    }

    try {
      const response = await updateEpisodeMutation.mutateAsync({
        title: data.title,
        content: content,
      });

      if (response.data) {
        setSuccessMessage(
          `Episode ${response.data.episode_number} has been updated successfully!`,
        );

        // Navigate back to episode with storyId after 2 seconds
        setTimeout(() => {
          navigate(`/story/${storyId}/episode/${episode.id}`);
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update episode";
      setServerError(errorMessage);
    }
  };

  return (
    <PageWrapper>
      <div className="py-12 max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/episode/${episode.id}`)}
            className="text-[#E8622A] dark:text-[#F07A3D] hover:underline text-sm mb-4 cursor-pointer">
            ← Back to Episode {episode.episode_number}
          </button>
          <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            Edit Episode {episode.episode_number}
          </h1>
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            Update the episode content
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
              Redirecting to episode...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Episode Title */}
          <Input
            label="Episode Title"
            type="text"
            placeholder="Enter episode title"
            {...register("title")}
            error={errors.title?.message}
          />

          {/* Episode Content */}
          <RichTextEditor
            value={content}
            onChange={setContent}
            label="Content"
            placeholder="Write your episode content here..."
            minHeight="350px"
          />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={updateEpisodeMutation.isPending}
              disabled={updateEpisodeMutation.isPending || !!successMessage}
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
      </div>
    </PageWrapper>
  );
};
