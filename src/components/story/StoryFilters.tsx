import React from "react";
import { Input } from "../common/Input";
import { GENRES } from "../../utils/constants";

export type SortOption = "newest" | "popular" | "trending";

interface StoryFiltersProps {
  selectedGenre: string;
  searchTitle: string;
  searchAuthor: string;
  sortBy: SortOption;
  onGenreChange: (genre: string) => void;
  onSearchTitleChange: (title: string) => void;
  onSearchAuthorChange: (author: string) => void;
  onSortChange: (sort: SortOption) => void;
}

export const StoryFilters: React.FC<StoryFiltersProps> = ({
  selectedGenre,
  searchTitle,
  searchAuthor,
  sortBy,
  onGenreChange,
  onSearchTitleChange,
  onSearchAuthorChange,
  onSortChange,
}) => {
  return (
    <div className="bg-white dark:bg-[#1E1E2E] border border-gray-300 dark:border-gray-600 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] mb-6">
        Filters & Search
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Title Search */}
        <Input
          label="Story Title"
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => onSearchTitleChange(e.target.value)}
        />

        {/* Author Search */}
        <Input
          label="Author"
          type="text"
          placeholder="Search by author..."
          value={searchAuthor}
          onChange={(e) => onSearchAuthorChange(e.target.value)}
        />

        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE] focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] focus:border-transparent transition duration-200">
            <option value="">All Genres</option>
            {Object.entries(GENRES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Option */}
        <div>
          <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-[#2A2A3E] text-[#1E1E2E] dark:text-[#FDF6EE] focus:outline-none focus:ring-2 focus:ring-[#E8622A] dark:focus:ring-[#F07A3D] focus:border-transparent transition duration-200">
            <option value="newest">Newest First</option>
            <option value="popular">Most Liked</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedGenre || searchTitle || searchAuthor) && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-[#6B6B7D] dark:text-[#B8B8C8] mb-3">
            Active filters:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedGenre && (
              <button
                onClick={() => onGenreChange("")}
                className="px-3 py-1 bg-[#E8622A] dark:bg-[#F07A3D] text-white rounded-full text-sm hover:opacity-80 transition flex items-center gap-2">
                {selectedGenre}
                <span>×</span>
              </button>
            )}
            {searchTitle && (
              <button
                onClick={() => onSearchTitleChange("")}
                className="px-3 py-1 bg-[#1E1E2E] dark:bg-[#3A3A52] text-[#FDF6EE] rounded-full text-sm hover:opacity-80 transition flex items-center gap-2">
                Title: {searchTitle}
                <span>×</span>
              </button>
            )}
            {searchAuthor && (
              <button
                onClick={() => onSearchAuthorChange("")}
                className="px-3 py-1 bg-[#1E1E2E] dark:bg-[#3A3A52] text-[#FDF6EE] rounded-full text-sm hover:opacity-80 transition flex items-center gap-2">
                Author: {searchAuthor}
                <span>×</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
