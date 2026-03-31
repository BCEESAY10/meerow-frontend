export type EpisodeStatus = "pending" | "approved" | "rejected";

export interface Episode {
  id: string;
  story_id: string;
  title: string;
  episode_number: number;
  content: string;
  read_time_minutes: number;
  status: EpisodeStatus;
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}
