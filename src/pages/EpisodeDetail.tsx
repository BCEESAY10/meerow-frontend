import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Spinner } from "../components/common/Spinner";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { CommentSection } from "../components/reactions/CommentSection";
import { LikeButton } from "../components/reactions/LikeButton";
import { useEpisode } from "../hooks/useEpisodes";
import { useAuth } from "../hooks/useAuth";
import { useComments } from "../hooks/useComments";
import type { Comment } from "../types/comment.types";
import { formatDate } from "../utils/formatDate";
import { formatReadTime } from "../utils/formatReadTime";

export const EpisodeDetail: React.FC = () => {
  const { episodeId } = useParams<{ episodeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: episodeData, isLoading, error } = useEpisode(episodeId || "");
  const [currentCommentPage, setCurrentCommentPage] = useState(1);

  // Hooks must be called at top level, before any conditional returns
  const {
    data: commentsResponse,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useComments(
    episodeData?.data?.id || "",
    "episode",
    currentCommentPage,
    10,
  );

  // Extract comments and pagination info
  const comments: Comment[] = [];
  let totalComments = 0;
  if (commentsResponse?.data) {
    if (Array.isArray(commentsResponse.data)) {
      comments.push(...commentsResponse.data);
      totalComments = commentsResponse.data.length;
    } else if ("comments" in commentsResponse.data) {
      comments.push(...commentsResponse.data.comments);
      totalComments = commentsResponse.data.total || 0;
    }
  }

  if (!episodeId) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <ErrorMessage
            message="Episode not found"
            onDismiss={() => navigate("/")}
          />
        </div>
      </PageWrapper>
    );
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      </PageWrapper>
    );
  }

  if (error || !episodeData?.data) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <ErrorMessage
            message={error?.message || "Episode not found"}
            onDismiss={() => navigate("/")}
          />
        </div>
      </PageWrapper>
    );
  }

  const episode = episodeData.data;
  const story = episode.story;
  const isAuthor = user?.id === story?.author?.id;

  // Get previous and next episodes for navigation
  const previousEpisode =
    episode.episode_number > 1
      ? {
          number: episode.episode_number - 1,
        }
      : null;

  const nextEpisode = {
    number: episode.episode_number + 1,
  };

  return (
    <PageWrapper>
      <div className="py-12">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <button
            onClick={() =>
              story ? navigate(`/story/${story.slug}`) : navigate("/")
            }
            className="text-[#E8622A] dark:text-[#F07A3D] hover:underline text-sm inline-flex items-center gap-2 cursor-pointer">
            ← {story ? `Back to ${story.title}` : "Back to Story"}
          </button>
        </div>

        {/* Episode Header */}
        <div className="max-w-4xl mx-auto mb-12">
          {story && (
            <div className="mb-6">
              <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm mb-2">
                {story.title}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="primary">{story.genre}</Badge>
                {story.is_episodic && <Badge variant="success">Series</Badge>}
              </div>
            </div>
          )}

          <h1 className="text-5xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            Episode {episode.episode_number}: {episode.title}
          </h1>

          <div className="flex items-center gap-4 mt-4 text-sm text-[#6B6B7D] dark:text-[#B8B8C8]">
            {episode.read_time_minutes && (
              <>
                <span>{formatReadTime(episode.read_time_minutes)}</span>
                <span>•</span>
              </>
            )}
            <span>Published {formatDate(episode.created_at)}</span>
          </div>

          {/* Author Actions */}
          {isAuthor && (
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  navigate(`/story/${story?.id}/episode/${episode.id}/edit`)
                }>
                Edit Episode
              </Button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#1E1E2E] rounded-lg p-8 mb-12">
            <div className="prose max-w-none text-[#1E1E2E] dark:text-[#FDF6EE] whitespace-pre-wrap leading-relaxed text-lg">
              {episode.content}
            </div>
          </div>

          {/* Episode Navigation */}
          <div className="flex gap-4 mb-12">
            {previousEpisode && (
              <Button
                variant="outline"
                onClick={() => {
                  // Navigate to previous episode - would need episode ID mapping
                  // For now, navigate back to story detail
                  navigate(`/story/${story?.slug}`);
                }}
                className="flex-1">
                ← Previous Episode
              </Button>
            )}

            {nextEpisode && (
              <Button
                variant="outline"
                onClick={() => {
                  // Navigate to next episode - would need episode ID mapping
                  // For now, navigate back to story detail
                  navigate(`/story/${story?.slug}`);
                }}
                className="flex-1">
                Next Episode →
              </Button>
            )}
          </div>

          {/* Story Navigation */}
          {story && (
            <div className="bg-gray-50 dark:bg-[#2A2A3E] rounded-lg p-6 text-center">
              <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-4">
                More episodes in this series
              </p>
              <Button
                variant="primary"
                onClick={() => navigate(`/story/${story.slug}`)}>
                View All Episodes
              </Button>
            </div>
          )}
        </div>

        {/* Reactions Section */}
        <div className="max-w-4xl mx-auto">
          {/* Like Button */}
          <div className="py-6 border-t border-gray-300 dark:border-gray-600">
            <LikeButton
              contentId={episode.id}
              contentType="episode"
              likeCount={episode.likeCount ?? episode._count?.likes ?? 0}
              userHasLiked={episode.userHasLiked}
            />
          </div>

          {/* Comments Section */}
          <CommentSection
            contentId={episode.id}
            contentType="episode"
            comments={comments}
            isLoadingComments={isLoadingComments}
            totalComments={totalComments}
            currentPage={currentCommentPage}
            onPageChange={setCurrentCommentPage}
            onCommentAdded={refetchComments}
          />
        </div>
      </div>
    </PageWrapper>
  );
};
