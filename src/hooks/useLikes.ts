import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import likeService from "../services/like.service";

export const useLike = (contentType: "story" | "episode") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: string) => likeService.like(contentId, contentType),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries();
    },
  });
};

export const useUnlike = (contentType: "story" | "episode") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: string) =>
      likeService.unlike(contentId, contentType),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries();
    },
  });
};

export const useLikeCount = (
  contentId?: string,
  contentType?: "story" | "episode",
) => {
  return useQuery({
    queryKey: ["likeCount", contentId, contentType],
    queryFn: () =>
      contentId && contentType
        ? likeService.getLikeCount(contentId, contentType)
        : null,
    enabled: !!contentId && !!contentType,
  });
};

export const useLikes = (
  contentId?: string,
  contentType?: "story" | "episode",
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["likes", contentId, contentType, page, limit],
    queryFn: () =>
      contentId && contentType
        ? likeService.getLikes(contentId, contentType, page, limit)
        : null,
    enabled: !!contentId && !!contentType,
  });
};
