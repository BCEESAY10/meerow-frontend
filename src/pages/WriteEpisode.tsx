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
import { useStoryBySlug } from "../hooks/useStories";
import { useCreateEpisode } from "../hooks/useEpisodes";

const episodeSchema = z.object({
  title: z.string().min(3, "Episode title must be at least 3 characters"),
  episode_number: z.number().min(1, "Episode number must be at least 1"),
  content: z.string().min(50, "Content must be at least 50 characters"),
});

type EpisodeFormData = z.infer<typeof episodeSchema>;

export const WriteEpisode: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const { data: storyData, isLoading: isLoadingStory } = useStoryBySlug(
    storyId || "",
  );
  const createEpisodeMutation = useCreateEpisode(storyId || "");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeSchema),
    defaultValues: {
      episode_number: 1,
    },
  });

  // Auto-increment episode number based on existing episodes
  useEffect(() => {
    if (storyData?.data?.episodes) {
      const nextEpisodeNumber = storyData.data.episodes.length + 1;
      setValue("episode_number", nextEpisodeNumber);
    }
  }, [storyData, setValue]);

  if (!storyId) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">Story not found</p>
        </div>
      </PageWrapper>
    );
  }

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
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">Story not found</p>
        </div>
      </PageWrapper>
    );
  }

  const story = storyData.data;

  if (!story.is_episodic) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            This story is not an episodic series
          </p>
        </div>
      </PageWrapper>
    );
  }

  const onSubmit: SubmitHandler<EpisodeFormData> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const response = await createEpisodeMutation.mutateAsync({
        title: data.title,
        episode_number: data.episode_number,
        content: data.content,
      });

      if (response.data) {
        setSuccessMessage(
          `Episode ${response.data.episode_number} has been submitted for review! It will appear once approved by our admin team.`,
        );

        // Navigate to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/author-dashboard");
        }, 3000);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create episode";
      setServerError(errorMessage);
    }
  };

  return (
    <PageWrapper>
      <div className="py-12 max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/story/${story.slug}`)}
            className="text-[#E8622A] dark:text-[#F07A3D] hover:underline text-sm mb-4 cursor-pointer">
            ← Back to {story.title}
          </button>
          <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            Add New Episode
          </h1>
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            Add the next chapter to your series
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
          {/* Episode Title */}
          <Input
            label="Episode Title"
            type="text"
            placeholder="e.g., Episode 1: The Beginning"
            {...register("title")}
            error={errors.title?.message}
          />

          {/* Episode Number */}
          <Input
            label="Episode Number"
            type="number"
            placeholder="1"
            {...register("episode_number")}
            error={errors.episode_number?.message}
          />

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Episode Content
            </label>
            <textarea
              {...register("content")}
              placeholder="Write your episode content here..."
              rows={12}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] focus:border-transparent transition duration-200"
            />
            {errors.content && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm mt-2">
              Minimum 50 words required for read time calculation
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={createEpisodeMutation.isPending}
              disabled={createEpisodeMutation.isPending || !!successMessage}
              className="flex-1">
              {successMessage ? "Redirecting..." : "Publish Episode"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate(`/story/${story.slug}`)}
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
