import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import episodeService from "../services/episode.service";
import type { Episode } from "../types/episode.types";

export const useEpisodes = (storyId?: string) => {
  return useQuery({
    queryKey: ["episodes", storyId],
    queryFn: () => (storyId ? episodeService.getEpisodes(storyId) : null),
    enabled: !!storyId,
  });
};

export const useEpisode = (storyId?: string, episodeId?: string) => {
  return useQuery({
    queryKey: ["episode", storyId, episodeId],
    queryFn: () =>
      storyId && episodeId
        ? episodeService.getEpisode(storyId, episodeId)
        : null,
    enabled: !!storyId && !!episodeId,
  });
};

export const useCreateEpisode = (storyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      episode_number: number;
      content: string;
    }) => episodeService.createEpisode(storyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["episodes", storyId] });
    },
  });
};

export const useUpdateEpisode = (storyId: string, episodeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Episode>) =>
      episodeService.updateEpisode(storyId, episodeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["episodes", storyId] });
      queryClient.invalidateQueries({
        queryKey: ["episode", storyId, episodeId],
      });
    },
  });
};

export const useDeleteEpisode = (storyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (episodeId: string) =>
      episodeService.deleteEpisode(storyId, episodeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["episodes", storyId] });
    },
  });
};
