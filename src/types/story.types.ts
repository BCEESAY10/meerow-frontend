import type { User } from "./user.types";
import type { Episode } from "./episode.types";

export type StoryStatus = "pending" | "approved" | "rejected";
export type Genre =
  | "Fantasy"
  | "Science Fiction"
  | "Romance"
  | "Thriller"
  | "Horror"
  | "Mystery"
  | "Adventure"
  | "Historical Fiction"
  | "Drama"
  | "Comedy"
  | "Slice of Life"
  | "Poetry"
  | "Other";

export interface Story {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  synopsis?: string;
  genre: Genre;
  is_episodic: boolean;
  content?: string;
  read_time_minutes?: number;
  status: StoryStatus;
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  likeCount?: number;
  userHasLiked?: boolean | null;
  author?: User;
  episodes?: Episode[];
  _count?: {
    episodes?: number;
    likes?: number;
    comments?: number;
  };
}
