import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import feedbackService from "../services/feedback.service";
import type { CreateFeedbackInput } from "../types/feedback.types";

export const useFeedbacks = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["feedbacks", page, limit],
    queryFn: () => feedbackService.getFeedbacks(page, limit),
  });
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeedbackInput) =>
      feedbackService.createFeedback(data),
    onSuccess: () => {
      // Invalidate feedbacks query to refetch
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => feedbackService.deleteFeedback(id),
    onSuccess: () => {
      // Invalidate feedbacks query to refetch
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
};
