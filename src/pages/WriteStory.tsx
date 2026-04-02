/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { useCreateStory } from "../hooks/useStories";
import { GENRES, GENRE_LIST } from "../utils/constants";
import type { Genre } from "../types/story.types";

const storySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  synopsis: z.string().min(10, "Synopsis must be at least 10 characters"),
  genre: z.enum(GENRE_LIST),
  is_episodic: z.boolean(),
  content: z.string().optional(),
});

type StoryFormData = z.infer<typeof storySchema>;

export const WriteStory: React.FC = () => {
  const navigate = useNavigate();
  const createStoryMutation = useCreateStory();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      is_episodic: false,
    },
  });

  const episodicValue = watch("is_episodic");

  const onSubmit: SubmitHandler<StoryFormData> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const createPayload = {
        title: data.title,
        synopsis: data.synopsis,
        genre: data.genre as Genre,
        is_episodic: data.is_episodic,
        ...(data.is_episodic ? {} : { content: data.content }),
      };

      const response = await createStoryMutation.mutateAsync(createPayload);

      if (response.data) {
        setSuccessMessage(
          `"${response.data.title}" has been submitted for review! It will appear in the feed once approved by our admin team.`,
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
        "Failed to create story";
      setServerError(errorMessage);
    }
  };

  return (
    <PageWrapper>
      <div className="py-12 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            Write a Story
          </h1>
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
            Share your story with the world. You can write a standalone story or
            start an episodic series.
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

          {/* Episodic Toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("is_episodic")}
                className="w-5 h-5 rounded border-gray-300 text-[#E8622A] cursor-pointer"
              />
              <span className="text-[#1E1E2E] dark:text-[#FDF6EE]">
                Write as an episodic series
              </span>
            </label>
          </div>

          {/* Full Content (only for non-episodic) */}
          {!episodicValue && (
            <div>
              <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
                Story Content
              </label>
              <textarea
                {...register("content")}
                placeholder="Write your complete story here..."
                rows={10}
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
          )}

          {episodicValue && (
            <div className="p-4 bg-[#FDF6EE] dark:bg-[#2A2A3E] border border-[#E8622A]/20 dark:border-[#F07A3D]/20 rounded-lg">
              <p className="text-[#1E1E2E] dark:text-[#FDF6EE] text-sm">
                <strong>Episodic series:</strong> You'll add the content for
                each episode after creating the series.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={createStoryMutation.isPending}
              disabled={createStoryMutation.isPending || !!successMessage}
              className="flex-1">
              {successMessage
                ? "Redirecting..."
                : episodicValue
                  ? "Create Series"
                  : "Publish Story"}
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
