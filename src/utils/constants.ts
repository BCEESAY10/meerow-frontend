import type { Genre } from "../types/story.types";

export const GENRES: Record<Genre, string> = {
  Fantasy: "Fantasy",
  "Science Fiction": "Science Fiction",
  Romance: "Romance",
  Thriller: "Thriller",
  Horror: "Horror",
  Mystery: "Mystery",
  Adventure: "Adventure",
  "Historical Fiction": "Historical Fiction",
  Drama: "Drama",
  Comedy: "Comedy",
  "Slice of Life": "Slice of Life",
  Poetry: "Poetry",
  Other: "Other",
};

export const GENRE_LIST: Genre[] = [
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Thriller",
  "Horror",
  "Mystery",
  "Adventure",
  "Historical Fiction",
  "Drama",
  "Comedy",
  "Slice of Life",
  "Poetry",
  "Other",
];

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const WORDS_PER_MINUTE = 200;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 12,
};

export const TOAST_DURATION = 3000;
