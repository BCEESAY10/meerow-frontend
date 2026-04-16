import type { User } from "./user.types";

export interface Feedback {
  id: string;
  user_id: string;
  body: string;
  rating?: number; // 1-5 optional rating
  created_at: string;
  updated_at: string;
  user?: User; // Author of the feedback
}

export interface CreateFeedbackInput {
  body: string;
  rating?: number;
}
