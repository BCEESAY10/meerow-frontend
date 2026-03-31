import apiClient from "./api";
import type { ApiResponse } from "../types/api.types";
import type { Comment } from "../types/comment.types";

export const commentService = {
  /**
   * Get comments for content
   */
  async getComments(
    contentId: string,
    contentType: "story" | "episode",
  ): Promise<ApiResponse<Comment[]>> {
    const response = await apiClient.get<ApiResponse<Comment[]>>("/comments", {
      params: { content_id: contentId, content_type: contentType },
    });
    return response.data;
  },

  /**
   * Post a comment
   */
  async createComment(data: {
    content_id: string;
    content_type: "story" | "episode";
    body: string;
  }): Promise<ApiResponse<Comment>> {
    const response = await apiClient.post<ApiResponse<Comment>>(
      "/comments",
      data,
    );
    return response.data;
  },

  /**
   * Delete a comment
   */
  async deleteComment(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/comments/${id}`,
    );
    return response.data;
  },
};

export default commentService;
