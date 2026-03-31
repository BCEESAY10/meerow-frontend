export type UserRole = "author" | "admin" | "reader";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agreed_to_terms: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  agreed_to_terms: boolean;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface AuthMeResponse {
  user: User;
}
