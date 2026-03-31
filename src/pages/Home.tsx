import React from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/common/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
          <div className="mt-16 p-8 bg-[#E8622A]/10 dark:bg-[#F07A3D]/20 rounded-lg border border-[#E8622A]/30 dark:border-[#F07A3D]/30">
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
              <Button variant="outline" disabled>
                Explore Stories (Coming Soon)
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Home;
