import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import commentService, {
  type CommentsPaginatedResponse,
} from "../services/comment.service";
import type { Comment } from "../types/comment.types";

export const useComments = (
  contentId?: string,
  contentType?: "story" | "episode",
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["comments", contentId, contentType, page, limit],
    queryFn: () =>
      contentId && contentType
        ? commentService.getComments(contentId, contentType, page, limit)
        : null,
    enabled: !!contentId && !!contentType,
  });
};

// Helper function to extract comments from response (handles both array and paginated responses)
function extractComments(
  data: unknown,
): Comment[] & { page?: number; limit?: number; total?: number } {
  if (Array.isArray(data)) {
    return data as Comment[];
  }
  if (data && typeof data === "object" && "comments" in data) {
    const paginated = data as CommentsPaginatedResponse;
    const comments = paginated.comments as Comment[] & {
      page?: number;
      limit?: number;
      total?: number;
    };
    comments.page = paginated.page;
    comments.limit = paginated.limit;
    comments.total = paginated.total;
    return comments;
  }
  return [] as Comment[];
}

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

export const useUpdateComment = (
  contentId: string,
  contentType: "story" | "episode",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; body: string }) =>
      commentService.updateComment(data.id, data.body),
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

// Helper export
export { extractComments };
