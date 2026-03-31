import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "../services/comment.service";

export const useComments = (
  contentId?: string,
  contentType?: "story" | "episode",
) => {
  return useQuery({
    queryKey: ["comments", contentId, contentType],
    queryFn: () =>
      contentId && contentType
        ? commentService.getComments(contentId, contentType)
        : null,
    enabled: !!contentId && !!contentType,
  });
};

export const useCreateComment = (
  contentId: string,
  contentType: "story" | "episode",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) =>
      commentService.createComment({
        content_id: contentId,
        content_type: contentType,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", contentId, contentType],
      });
    },
  });
};

export const useDeleteComment = (
  contentId?: string,
  contentType?: "story" | "episode",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(commentId),
    onSuccess: () => {
      if (contentId && contentType) {
        queryClient.invalidateQueries({
          queryKey: ["comments", contentId, contentType],
        });
      }
    },
  });
};
