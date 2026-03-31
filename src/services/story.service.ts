import apiClient from "./api";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type { Story } from "../types/story.types";

export const storyService = {
  /**
   * Get all approved stories with filtering and pagination
   */
  async getStories(params?: {
    page?: number;
    limit?: number;
    genre?: string;
    author?: string;
    title?: string;
    sort?: "newest" | "popular";
  }): Promise<PaginatedResponse<Story[]>> {
    const response = await apiClient.get<PaginatedResponse<Story[]>>(
      "/stories",
      {
        params,
      },
    );
    return response.data;
  },

  /**
   * Get single story by slug
   */
  async getStoryBySlug(slug: string): Promise<ApiResponse<Story>> {
    const response = await apiClient.get<ApiResponse<Story>>(
      `/stories/${slug}`,
    );
    return response.data;
  },

  /**
   * Get current user's stories
   */
  async getUserStories(): Promise<ApiResponse<Story[]>> {
    const response = await apiClient.get<ApiResponse<Story[]>>("/stories/me");
    return response.data;
  },

  /**
   * Create a new story
   */
  async createStory(data: {
    title: string;
    synopsis?: string;
    genre: string;
    is_episodic: boolean;
    content?: string;
  }): Promise<ApiResponse<Story>> {
    const response = await apiClient.post<ApiResponse<Story>>("/stories", data);
    return response.data;
  },

  /**
   * Update an existing story
   */
  async updateStory(
    id: string,
    data: Partial<Story>,
  ): Promise<ApiResponse<Story>> {
    const response = await apiClient.put<ApiResponse<Story>>(
      `/stories/${id}`,
      data,
    );
    return response.data;
  },

  /**
   * Delete a story
   */
  async deleteStory(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/stories/${id}`,
    );
    return response.data;
  },
};

export default storyService;
