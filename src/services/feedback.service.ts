import apiClient from "./api";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type { Feedback, CreateFeedbackInput } from "../types/feedback.types";

interface FeedbacksPaginatedResponse {
  feedbacks: Feedback[];
  total: number;
  page: number;
  limit: number;
}

export const feedbackService = {
  /**
   * Get all feedbacks with pagination
   */
  async getFeedbacks(
    page: number = 1,
    limit: number = 10,
  ): Promise<
    PaginatedResponse<Feedback[]> | ApiResponse<FeedbacksPaginatedResponse>
  > {
    const response = await apiClient.get<
      PaginatedResponse<Feedback[]> | ApiResponse<FeedbacksPaginatedResponse>
    >("/feedbacks", {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Submit a new feedback
   */
  async createFeedback(
    data: CreateFeedbackInput,
  ): Promise<ApiResponse<Feedback>> {
    const response = await apiClient.post<ApiResponse<Feedback>>(
      "/feedbacks",
      data,
    );
    return response.data;
  },

  /**
   * Delete a feedback (only by author or admin)
   */
  async deleteFeedback(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/feedbacks/${id}`,
    );
    return response.data;
  },
};

export default feedbackService;
