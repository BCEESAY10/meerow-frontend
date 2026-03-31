export type StoryStatus = "pending" | "approved" | "rejected";
export type Genre =
  | "fantasy"
  | "romance"
  | "thriller"
  | "sci-fi"
  | "drama"
  | "mystery"
  | "horror"
  | "historical"
  | "other";

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
}
