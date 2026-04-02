import React from "react";
import { useNavigate } from "react-router-dom";
import type { Episode } from "../../types/episode.types";
import { formatRelativeTime } from "../../utils/formatDate";
import { formatReadTime } from "../../utils/formatReadTime";

interface EpisodeCardProps {
  episode: Episode;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-[#1E1E2E] border border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:shadow-md dark:hover:shadow-md transition duration-200 cursor-pointer"
      onClick={() => navigate(`/episode/${episode.id}`)}
      role="article">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Episode Number & Title */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-[#E8622A] dark:text-[#F07A3D]">
              Episode {episode.episode_number}
            </p>
            <h3 className="text-lg font-bold text-[#1E1E2E] dark:text-[#FDF6EE] hover:text-[#E8622A] dark:hover:text-[#F07A3D] transition">
              {episode.title}
            </h3>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
            {episode.read_time_minutes && (
              <>
                <span>{formatReadTime(episode.read_time_minutes)}</span>
                <span>•</span>
              </>
            )}
            <span>{formatRelativeTime(episode.created_at)}</span>
          </div>

          {/* Stats */}
          {episode._count && (
            <div className="flex gap-3 mt-3 text-xs text-[#6B6B7D] dark:text-[#B8B8C8]">
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {episode._count.likes}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                {episode._count.comments}
              </span>
            </div>
          )}
        </div>

        {/* Arrow Icon */}
        <svg
          className="w-5 h-5 text-[#E8622A] dark:text-[#F07A3D] flex-shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};
