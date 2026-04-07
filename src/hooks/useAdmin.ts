import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "../services/admin.service";

/**
 * Hook to fetch moderation queue
 */
export const useAdminQueue = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["adminQueue", page, limit],
    queryFn: () => adminService.getQueue(page, limit),
  });
};

/**
 * Hook to fetch single queue item for review
 */
export const useQueueItem = (type?: "story" | "episode", id?: string) => {
  return useQuery({
    queryKey: ["queueItem", type, id],
    queryFn: () => {
      if (!type || !id) throw new Error("Type and ID are required");
      return adminService.getQueueItem(type, id);
    },
    enabled: !!type && !!id,
  });
};

/**
 * Hook to approve content
 */
export const useApproveContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { type: "story" | "episode"; id: string }) =>
      adminService.approveContent(data.type, data.id),
    onSuccess: () => {
      // Invalidate queue and specific item queries
      queryClient.invalidateQueries({ queryKey: ["adminQueue"] });
      queryClient.invalidateQueries({ queryKey: ["queueItem"] });
    },
  });
};

/**
 * Hook to reject content
 */
export const useRejectContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      type: "story" | "episode";
      id: string;
      reason: string;
    }) => adminService.rejectContent(data.type, data.id, data.reason),
    onSuccess: () => {
      // Invalidate queue and specific item queries
      queryClient.invalidateQueries({ queryKey: ["adminQueue"] });
      queryClient.invalidateQueries({ queryKey: ["queueItem"] });
    },
  });
};

/**
 * Hook to update content as admin (for editing before approval)
 */
export const useAdminUpdateContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      type: "story" | "episode";
      id: string;
      updates: Record<string, string | boolean>;
    }) => {
      // Use the story service update endpoint for both stories and episodes
      return import("../services/story.service").then((module) =>
        module.default.updateStory(data.id, data.updates),
      );
    },
    onSuccess: () => {
      // Invalidate queue and specific item queries
      queryClient.invalidateQueries({ queryKey: ["adminQueue"] });
      queryClient.invalidateQueries({ queryKey: ["queueItem"] });
    },
  });
};
