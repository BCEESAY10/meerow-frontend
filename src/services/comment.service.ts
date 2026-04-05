import apiClient from "./api";
import type { ApiResponse } from "../types/api.types";
import type { Comment } from "../types/comment.types";

export interface CommentsPaginatedResponse {
  comments: Comment[];
  total: number;
  page: number;
  limit: number;
}

export const commentService = {
  /**
   * Get comments for content with optional pagination
   */
  async getComments(
    contentId: string,
    contentType: "story" | "episode",
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<CommentsPaginatedResponse | Comment[]>> {
    const response = await apiClient.get<
      ApiResponse<CommentsPaginatedResponse | Comment[]>
    >("/comments", {
      params: { content_id: contentId, content_type: contentType, page, limit },
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

  /**
   * Update a comment
   */
  async updateComment(id: string, body: string): Promise<ApiResponse<Comment>> {
    const response = await apiClient.put<ApiResponse<Comment>>(
      `/comments/${id}`,
      { body },
    );
    return response.data;
  },
};

export default commentService;
