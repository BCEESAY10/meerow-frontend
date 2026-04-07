/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminQueue } from "../../hooks/useAdmin";
import { Spinner } from "../../components/common/Spinner";
import { Badge } from "../../components/common/Badge";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { formatDate } from "../../utils/formatDate";

export const AdminQueue: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useAdminQueue(currentPage, 10);

  const queue = data?.data || [];
  const meta = data?.meta;

  const handleViewItem = (type: "story" | "episode", id: string) => {
    navigate(`/admin/review/${type}/${id}`);
  };

  const getContentType = (item: any): "story" | "episode" => {
    return item.type === "story" ? "story" : "episode";
  };

  const getItemTitle = (item: any): string => {
    if (item.type === "episode") {
      return `${item.story?.title || "Series"} - ${item.title}`;
    }
    return item.title;
  };

  const getContentSubtext = (item: any): string => {
    if (item.type === "episode") {
      return `Episode ${item.episode_number}`;
    }
    if (item.is_episodic) {
      return "Episodic Series";
    }
    return "Standalone Story";
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h1 className="text-3xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
            Moderation Queue
          </h1>
          <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mt-2">
            Review and moderate pending stories and episodes
          </p>
        </div>

        {/* Stats */}
        {meta && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8] mb-1">
                Total Pending
              </p>
              <p className="text-2xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
                {meta.total}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8] mb-1">
                Stories
              </p>
              <p className="text-2xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
                {meta.storyCount}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8] mb-1">
                Episodes
              </p>
              <p className="text-2xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
                {meta.episodeCount}
              </p>
            </div>
          </div>
        )}

        {/* Queue List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-800 dark:text-red-200">
              Failed to load moderation queue
            </p>
          </div>
        ) : queue.length > 0 ? (
          <>
            <div className="space-y-3">
              {queue.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleViewItem(getContentType(item), item.id)}
                  className="w-full bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="warning">
                          {item.type === "story" ? "Story" : "Episode"}
                        </Badge>
                        <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8]">
                          {getContentSubtext(item)}
                        </p>
                      </div>
                      <h3 className="font-bold text-[#1E1E2E] dark:text-[#FDF6EE] truncate">
                        {getItemTitle(item)}
                      </h3>
                      <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8] mt-1">
                        by {item.author?.name || "Unknown"}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-[#6B6B7D] dark:text-[#B8B8C8]">
                        {formatDate(item.created_at)}
                      </p>
                      <p className="text-xs text-[#E8622A] dark:text-[#F07A3D] font-medium mt-1">
                        Review →
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] bg-gray-100 dark:bg-[#2A2A3E] rounded-lg hover:bg-gray-200 dark:hover:bg-[#333346] disabled:opacity-50 disabled:cursor-not-allowed transition">
                  ← Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 text-sm font-medium rounded-lg transition ${
                          currentPage === page
                            ? "bg-[#E8622A] dark:bg-[#F07A3D] text-white"
                            : "text-[#1E1E2E] dark:text-[#FDF6EE] bg-gray-100 dark:bg-[#2A2A3E] hover:bg-gray-200 dark:hover:bg-[#333346]"
                        }`}>
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(meta.totalPages, currentPage + 1))
                  }
                  disabled={currentPage === meta.totalPages}
                  className="px-3 py-2 text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] bg-gray-100 dark:bg-[#2A2A3E] rounded-lg hover:bg-gray-200 dark:hover:bg-[#333346] disabled:opacity-50 disabled:cursor-not-allowed transition">
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-50 dark:bg-[#2A2A3E] rounded-lg p-8 text-center">
            <p className="text-[#6B6B7D] dark:text-[#B8B8C8]">
              No pending content. All items have been reviewed!
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AdminQueue;
