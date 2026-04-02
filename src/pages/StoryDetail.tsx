import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Spinner } from "../components/common/Spinner";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { useStoryBySlug } from "../hooks/useStories";
import { useAuth } from "../hooks/useAuth";
import { formatRelativeTime } from "../utils/formatDate";
import { formatReadTime } from "../utils/formatReadTime";

export const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: storyData, isLoading, error } = useStoryBySlug(slug || "");
  const [expandedEpisodes, setExpandedEpisodes] = useState<Set<number>>(
    new Set(),
  );

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      </PageWrapper>
    );
  }

  if (error || !storyData?.data) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <ErrorMessage
            message={error?.message || "Story not found"}
            onDismiss={() => navigate("/")}
          />
        </div>
      </PageWrapper>
    );
  }

  const story = storyData.data;
  const isAuthor = user?.id === story.author?.id;

  const toggleEpisodeExpanded = (episodeNumber: number) => {
    const newExpanded = new Set(expandedEpisodes);
    if (newExpanded.has(episodeNumber)) {
      newExpanded.delete(episodeNumber);
    } else {
      newExpanded.add(episodeNumber);
    }
    setExpandedEpisodes(newExpanded);
  };

  return (
    <PageWrapper>
      <div className="py-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <button
            onClick={() => navigate("/")}
            className="text-[#E8622A] dark:text-[#F07A3D] hover:underline text-sm mb-4 cursor-pointer">
            ← Back Home
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary">{story.genre}</Badge>
              <Badge variant="info">
                {story.status === "approved" ? "Published" : "Pending"}
              </Badge>
              {story.is_episodic && <Badge variant="success">Series</Badge>}
            </div>

            <h1 className="text-5xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
              {story.title}
            </h1>

            {/* Author Info */}
            {story.author && (
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-300 dark:border-gray-600">
                <div>
                  <p className="font-semibold text-[#1E1E2E] dark:text-[#FDF6EE]">
                    {story.author.name}
                  </p>
                  <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
                    Published {formatRelativeTime(story.created_at)}
                  </p>
                </div>
              </div>
            )}

            {/* Synopsis */}
            <p className="text-lg text-[#1E1E2E] dark:text-[#FDF6EE] mb-6 leading-relaxed">
              {story.synopsis}
            </p>

            {/* Stats */}
            <div className="flex gap-6 text-sm mb-6">
              {story._count && (
                <>
                  <span className="text-[#6B6B7D] dark:text-[#B8B8C8]">
                    <strong className="text-[#1E1E2E] dark:text-[#FDF6EE]">
                      {story._count.likes}
                    </strong>{" "}
                    {story._count.likes === 1 ? "Like" : "Likes"}
                  </span>
                  <span className="text-[#6B6B7D] dark:text-[#B8B8C8]">
                    <strong className="text-[#1E1E2E] dark:text-[#FDF6EE]">
                      {story._count.comments}
                    </strong>{" "}
                    {story._count.comments === 1 ? "Comment" : "Comments"}
                  </span>
                  <span className="text-[#6B6B7D] dark:text-[#B8B8C8]">
                    <strong className="text-[#1E1E2E] dark:text-[#FDF6EE]">
                      {story._count.episodes}
                    </strong>{" "}
                    {story._count.episodes === 1 ? "Episode" : "Episodes"}
                  </span>
                </>
              )}
            </div>

            {/* Author Actions */}
            {isAuthor && (
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={() => navigate(`/story/${story.id}/edit`)}>
                  Edit Story
                </Button>
                {story.is_episodic && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(`/story/${story.id}/write-episode`)
                    }>
                    Add Episode
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          {story.is_episodic ? (
            // Episodes list for episodic stories
            <div>
              <h2 className="text-2xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-8">
                Episodes ({story._count?.episodes || 0})
              </h2>

              {story.episodes && story.episodes.length > 0 ? (
                <div className="space-y-4">
                  {story.episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-lg transition duration-200">
                      {/* Episode Header */}
                      <button
                        onClick={() =>
                          toggleEpisodeExpanded(episode.episode_number)
                        }
                        className="w-full p-6 bg-gray-50 dark:bg-[#2A2A3E] hover:bg-gray-100 dark:hover:bg-[#333346] flex items-center justify-between cursor-pointer transition">
                        <div className="text-left">
                          <p className="text-sm text-[#E8622A] dark:text-[#F07A3D] font-semibold">
                            Episode {episode.episode_number}
                          </p>
                          <h3 className="text-lg font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mt-1">
                            {episode.title}
                          </h3>
                          {episode.read_time_minutes && (
                            <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8] mt-2">
                              {formatReadTime(episode.read_time_minutes)}
                            </p>
                          )}
                        </div>
                        <svg
                          className={`w-6 h-6 text-[#1E1E2E] dark:text-[#FDF6EE] transform transition ${
                            expandedEpisodes.has(episode.episode_number)
                              ? "rotate-180"
                              : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </button>

                      {/* Episode Content */}
                      {expandedEpisodes.has(episode.episode_number) && (
                        <div className="p-6 border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2E]">
                          <div className="prose max-w-none text-[#1E1E2E] dark:text-[#FDF6EE] whitespace-pre-wrap mb-6">
                            {episode.content}
                          </div>

                          <div className="flex gap-3 pt-6 border-t border-gray-300 dark:border-gray-600">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() =>
                                navigate(`/episode/${episode.id}`)
                              }>
                              Read Full Episode
                            </Button>
                            {isAuthor && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    navigate(
                                      `/story/${story.id}/episode/${episode.id}/edit`,
                                    )
                                  }>
                                  Edit
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-[#2A2A3E] rounded-lg">
                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
                    No episodes yet.{" "}
                    {isAuthor && "Start by adding your first episode!"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Full story content for standalone stories
            <div className="bg-white dark:bg-[#1E1E2E] rounded-lg p-8 prose max-w-none">
              <div className="text-[#1E1E2E] dark:text-[#FDF6EE] whitespace-pre-wrap leading-relaxed">
                {story.content}
              </div>
            </div>
          )}
        </div>

        {/* TODO: Add reactions (LikeButton, CommentSection) */}
      </div>
    </PageWrapper>
  );
};
