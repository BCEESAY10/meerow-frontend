import { useMutation, useQueryClient } from "@tanstack/react-query";
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
