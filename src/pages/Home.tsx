import React, { useState, useMemo } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/common/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useStories } from "../hooks/useStories";
import { StoryCard } from "../components/story/StoryCard";
import { StoryFilters } from "../components/story/StoryFilters";
import type { SortOption } from "../components/story/StoryFilters";
import { Spinner } from "../components/common/Spinner";
import { EmptyState } from "../components/common/EmptyState";

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { data: storiesData, isLoading } = useStories();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const stories = storiesData?.data || [];

  // Filter and sort stories
  const filteredAndSortedStories = useMemo(() => {
    let filtered = stories.filter((story) => {
      const matchesGenre = !selectedGenre || story.genre === selectedGenre;
      const matchesTitle =
        !searchTitle ||
        story.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchesAuthor =
        !searchAuthor ||
        story.author?.name.toLowerCase().includes(searchAuthor.toLowerCase());

      return matchesGenre && matchesTitle && matchesAuthor;
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "popular":
          return (b._count?.likes || 0) - (a._count?.likes || 0);
        case "trending":
          // Combine likes and comments for trending
          const aScore = (a._count?.likes || 0) * 2 + (a._count?.comments || 0);
          const bScore = (b._count?.likes || 0) * 2 + (b._count?.comments || 0);
          return bScore - aScore;
        default:
          return 0;
      }
    });

    return sorted;
  }, [stories, selectedGenre, searchTitle, searchAuthor, sortBy]);

  return (
    <PageWrapper>
      <div className="py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-4">
            Welcome to{" "}
            <span className="text-[#E8622A] dark:text-[#F07A3D]">Meerow</span>
          </h1>
          <p className="text-xl text-[#6B6B7D] dark:text-[#B8B8C8] mb-8 max-w-2xl mx-auto">
            Share your stories with the world. Discover amazing narratives from
            authors everywhere.
          </p>
          <div className="flex justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/write-story">
                  <Button variant="primary" size="lg">
                    Write a Story
                  </Button>
                </Link>
                <Link to="/author-dashboard">
                  <Button variant="outline" size="lg">
                    My Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-16">
          <div className="p-6 bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52]">
            <div className="text-4xl mb-4">✍️</div>
            <h2 className="text-xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Write
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              Share your stories as standalone pieces or episodic series.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52]">
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Discover
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              Find extraordinary stories from talented authors worldwide.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52]">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Engage
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              Like, comment, and connect with the author community.
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        {isAuthenticated && (
          <div className="mb-16 p-8 bg-[#E8622A]/10 dark:bg-[#F07A3D]/20 rounded-lg border border-[#E8622A]/30 dark:border-[#F07A3D]/30">
            <h2 className="text-2xl font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
              Welcome, {user?.name}! 👋
            </h2>
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-4">
              You're all set to start exploring stories and sharing your own.
            </p>
            <div className="flex gap-4">
              <Link to="/write-story">
                <Button variant="primary">Write Your First Story</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Stories Discovery Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE] mb-8">
            Discover Stories
          </h2>

          {/* Filters */}
          <StoryFilters
            selectedGenre={selectedGenre}
            searchTitle={searchTitle}
            searchAuthor={searchAuthor}
            sortBy={sortBy}
            onGenreChange={setSelectedGenre}
            onSearchTitleChange={setSearchTitle}
            onSearchAuthorChange={setSearchAuthor}
            onSortChange={setSortBy}
          />

          {/* Stories Grid/List */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : filteredAndSortedStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="📚"
              title="No Stories Found"
              description={
                selectedGenre || searchTitle || searchAuthor
                  ? "No stories match your filters. Try adjusting your search."
                  : "No stories published yet. Be the first to write one!"
              }
              action={
                !isAuthenticated
                  ? {
                      label: "Sign Up to Write",
                      onClick: () => (window.location.href = "/register"),
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
