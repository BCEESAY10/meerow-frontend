/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "./api";
import type { User } from "../types/user.types";

export interface QueueItem {
  id: string;
  type: "story" | "episode";
  title: string;
  status: "pending";
  created_at: string;
  author_id: string;
  author: User;
}

export interface StoryQueueItem extends QueueItem {
  type: "story";
  is_episodic: boolean;
}

export interface EpisodeQueueItem extends QueueItem {
  type: "episode";
  episode_number: number;
  story_id: string;
  story: {
    id: string;
    title: string;
  };
}

export interface QueueListResponse {
  success: boolean;
  message: string;
  data: (StoryQueueItem | EpisodeQueueItem)[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    storyCount: number;
    episodeCount: number;
  };
}

export interface QueueItemDetailResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    content: string;
    genre?: string;
    is_episodic?: boolean;
    status: "pending";
    created_at: string;
    author_id: string;
    author: User;
    episodes?: Array<{
      id: string;
      title: string;
      episode_number: number;
      status: "pending";
    }>;
  };
}

export interface ApproveContentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    status: "approved";
    reviewed_by: string;
    reviewed_at: string;
    published_at: string;
  };
}

export interface RejectContentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    status: "rejected";
    rejection_reason: string;
    reviewed_by: string;
    reviewed_at: string;
  };
}

export const adminService = {
  /**
   * Get moderation queue
   */
  async getQueue(
    page: number = 1,
    limit: number = 10,
  ): Promise<QueueListResponse> {
    const response = await apiClient.get<QueueListResponse>("/admin/queue", {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get single pending content for review
   */
  async getQueueItem(
    type: "story" | "episode",
    id: string,
  ): Promise<QueueItemDetailResponse> {
    const response = await apiClient.get<QueueItemDetailResponse>(
      `/admin/queue/${type}/${id}`,
    );
    return response.data;
  },

  /**
   * Approve content (makes it live)
   */
  async approveContent(
    type: "story" | "episode",
    id: string,
  ): Promise<ApproveContentResponse> {
    const response = await apiClient.patch<ApproveContentResponse>(
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
  ): Promise<RejectContentResponse> {
    const response = await apiClient.patch<RejectContentResponse>(
      `/admin/reject/${type}/${id}`,
      {
        rejection_reason: rejectionReason,
      },
    );
    return response.data;
  },
};

export default adminService;
