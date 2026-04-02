/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "./api";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";

export interface PendingContent {
  id: string;
  type: "story" | "episode";
  title: string;
  author_name: string;
  submitted_date: string;
  status: "pending";
}

export const adminService = {
  /**
   * Get moderation queue
   */
  async getQueue(
    page?: number,
    limit?: number,
  ): Promise<PaginatedResponse<PendingContent[]>> {
    const response = await apiClient.get<PaginatedResponse<PendingContent[]>>(
      "/admin/queue",
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  /**
   * Get single pending content
   */
  async getQueueItem(
    type: "story" | "episode",
    id: string,
  ): Promise<ApiResponse<any>> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/queue/${type}/${id}`,
    );
    return response.data;
  },

  /**
   * Approve content
   */
  async approveContent(
    type: "story" | "episode",
    id: string,
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.patch<ApiResponse<void>>(
      `/admin/approve/${type}/${id}`,
    );
    return response.data;
  },

  /**
   * Reject content with reason
   */
  async rejectContent(
    type: "story" | "episode",
    id: string,
    rejectionReason: string,
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.patch<ApiResponse<void>>(
      `/admin/reject/${type}/${id}`,
      {
        rejection_reason: rejectionReason,
      },
    );
    return response.data;
  },
};

export default adminService;
