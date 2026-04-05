import apiClient from "./api";
import type { ApiResponse } from "../types/api.types";

export interface Like {
  id: string;
  user_id: string;
  content_id: string;
  content_type: "story" | "episode";
  created_at: string;
}

export const likeService = {
  /**
   * Like content
   */
  async like(
    contentId: string,
    contentType: "story" | "episode",
  ): Promise<ApiResponse<Like>> {
    const response = await apiClient.post<ApiResponse<Like>>("/likes", {
      content_id: contentId,
      content_type: contentType,
    });
    return response.data;
  },

  /**
   * Unlike content
   */
  async unlike(
    contentId: string,
    contentType: "story" | "episode",
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>("/likes", {
      data: { content_id: contentId, content_type: contentType },
    });
    return response.data;
  },

  /**
   * Get like count for content
   */
  async getLikeCount(
    contentId: string,
    contentType: "story" | "episode",
  ): Promise<ApiResponse<{ count: number }>> {
    const response = await apiClient.get<ApiResponse<{ count: number }>>(
      "/likes/count",
      {
        params: { content_id: contentId, content_type: contentType },
      },
    );
    return response.data;
  },

  /**
   * Get users who liked content (paginated)
   */
  async getLikes(
    contentId: string,
    contentType: "story" | "episode",
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<{ likes: Like[]; total: number }>> {
    const response = await apiClient.get<
      ApiResponse<{ likes: Like[]; total: number }>
    >("/likes", {
      params: { content_id: contentId, content_type: contentType, page, limit },
    });
    return response.data;
  },
};

export default likeService;
