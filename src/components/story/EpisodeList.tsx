import React from "react";
import type { Episode } from "../../types/episode.types";
import { EpisodeCard } from "./EpisodeCard";
import { EmptyState } from "../common/EmptyState";

interface EpisodeListProps {
  episodes: Episode[];
  isLoading?: boolean;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-[#2A2A3E] rounded-lg h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <EmptyState
        icon="📺"
        title="No Episodes Yet"
        description="This series hasn't published any episodes yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {episodes
        .sort((a, b) => a.episode_number - b.episode_number)
        .map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
    </div>
  );
};
