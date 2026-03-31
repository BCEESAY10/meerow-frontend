import apiClient from "./api";
import type { ApiResponse } from "../types/api.types";
import type { Episode } from "../types/episode.types";

export const episodeService = {
  /**
   * Get episodes for a story
   */
  async getEpisodes(storyId: string): Promise<ApiResponse<Episode[]>> {
    const response = await apiClient.get<ApiResponse<Episode[]>>(
      `/stories/${storyId}/episodes`,
    );
    return response.data;
  },

  /**
   * Get single episode
   */
  async getEpisode(
    storyId: string,
    episodeId: string,
  ): Promise<ApiResponse<Episode>> {
    const response = await apiClient.get<ApiResponse<Episode>>(
      `/stories/${storyId}/episodes/${episodeId}`,
    );
    return response.data;
  },

  /**
   * Create new episode
   */
  async createEpisode(
    storyId: string,
    data: {
      title: string;
      episode_number: number;
      content: string;
    },
  ): Promise<ApiResponse<Episode>> {
    const response = await apiClient.post<ApiResponse<Episode>>(
      `/stories/${storyId}/episodes`,
      data,
    );
    return response.data;
  },

  /**
   * Update episode
   */
  async updateEpisode(
    storyId: string,
    episodeId: string,
    data: Partial<Episode>,
  ): Promise<ApiResponse<Episode>> {
    const response = await apiClient.put<ApiResponse<Episode>>(
      `/stories/${storyId}/episodes/${episodeId}`,
      data,
    );
    return response.data;
  },

  /**
   * Delete episode
   */
  async deleteEpisode(
    storyId: string,
    episodeId: string,
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/stories/${storyId}/episodes/${episodeId}`,
    );
    return response.data;
  },
};

export default episodeService;
