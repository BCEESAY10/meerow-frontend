import type { Genre } from "../types/story.types";

export const GENRES: Record<Genre, string> = {
  fantasy: "Fantasy",
  romance: "Romance",
  thriller: "Thriller",
  "sci-fi": "Sci-Fi",
  drama: "Drama",
  mystery: "Mystery",
  horror: "Horror",
  historical: "Historical",
  other: "Other",
};

export const GENRE_LIST: Genre[] = [
  "fantasy",
  "romance",
  "thriller",
  "sci-fi",
  "drama",
  "mystery",
  "horror",
  "historical",
  "other",
];

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const WORDS_PER_MINUTE = 200;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 12,
};

export const TOAST_DURATION = 3000;
