import apiClient from "./api";
import type { ApiResponse } from "../types/api.types";
import type { Feedback, CreateFeedbackInput } from "../types/feedback.types";

interface FeedbacksMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface FeedbacksApiResponse extends ApiResponse<Feedback[]> {
  meta: FeedbacksMeta;
}

export const feedbackService = {
  /**
   * Get all feedbacks with pagination
   */
  async getFeedbacks(
    page: number = 1,
    limit: number = 10,
  ): Promise<FeedbacksApiResponse> {
    const response = await apiClient.get<FeedbacksApiResponse>("/feedbacks", {
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
