import React from "react";
import { useNavigate } from "react-router-dom";
import type { Story } from "../../types/story.types";
import { Badge } from "../common/Badge";
import { formatRelativeTime } from "../../utils/formatDate";

interface StoryCardProps {
  story: Story;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-[#1E1E2E] border border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-lg transition duration-200 cursor-pointer"
      onClick={() => navigate(`/story/${story.slug}`)}
      role="article">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge variant="primary" className="mb-2">
            {story.genre}
          </Badge>
          {story.is_episodic && (
            <Badge variant="success" className="ml-2">
              Series
            </Badge>
          )}
        </div>
        {story.status === "approved" && (
          <Badge variant="success" className="text-xs">
            Published
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-3 hover:text-[#E8622A] dark:hover:text-[#F07A3D] transition">
        {story.title}
      </h3>

      {/* Synopsis */}
      <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm mb-4 line-clamp-2">
        {story.synopsis}
      </p>

      {/* Author Info */}
      {story.author && (
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE]">
              {story.author.name}
            </p>
            <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8]">
              {formatRelativeTime(story.created_at)}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <span className="flex items-center gap-1 text-[#6B6B7D] dark:text-[#B8B8C8]">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {story._count?.likes || 0}
        </span>

        <span className="flex items-center gap-1 text-[#6B6B7D] dark:text-[#B8B8C8]">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          {story._count?.comments || 0}
        </span>

        {story.is_episodic && (
          <span className="flex items-center gap-1 text-[#6B6B7D] dark:text-[#B8B8C8]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h3.59V16h2V13.83h3.59l-2.75-3.54 1.96-2.36H15.5V7h-2v2.93H9.91l1.96 2.36z" />
            </svg>
            {story._count?.episodes || 0}
          </span>
        )}
      </div>
    </div>
  );
};
