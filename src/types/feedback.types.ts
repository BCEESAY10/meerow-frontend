import type { User } from "./user.types";

export interface Feedback {
  id: string;
  user_id: string;
  body: string;
  rating?: number; // 1-5 optional rating
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
  author: User; // Author of the feedback with name field
}

export interface CreateFeedbackInput {
  body: string;
  rating?: number;
}
