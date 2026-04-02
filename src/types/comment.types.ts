import type { User } from "./user.types";

export type ContentType = "story" | "episode";

export interface Comment {
  id: string;
  user_id: string;
  content_id: string;
  content_type: ContentType;
  body: string;
  created_at: string;
  updated_at: string;
  user?: User;
}
