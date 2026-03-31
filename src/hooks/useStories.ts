import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import storyService from "../services/story.service";
import type { Story } from "../types/story.types";

export const useStories = (params?: {
  page?: number;
  limit?: number;
  genre?: string;
  author?: string;
  title?: string;
  sort?: "newest" | "popular";
}) => {
  return useQuery({
    queryKey: ["stories", params],
    queryFn: () => storyService.getStories(params),
  });
};

export const useStoryBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ["story", slug],
    queryFn: () => (slug ? storyService.getStoryBySlug(slug) : null),
    enabled: !!slug,
  });
};

export const useUserStories = () => {
  return useQuery({
    queryKey: ["userStories"],
    queryFn: () => storyService.getUserStories(),
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      synopsis?: string;
      genre: string;
      is_episodic: boolean;
      content?: string;
    }) => storyService.createStory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
    },
  });
};

export const useUpdateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Story> }) =>
      storyService.updateStory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storyService.deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
    },
  });
};
