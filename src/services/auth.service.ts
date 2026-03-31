import apiClient from "./api";
import type { ApiResponse } from "../types/api.types";
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthMeResponse,
} from "../types/user.types";

const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  GOOGLE: "/auth/google",
  GOOGLE_CALLBACK: "/auth/google/callback",
  HEALTH: "/health",
};

export const authService = {
  /**
   * Register a new user
   */
  async register(
    data: RegisterRequest,
  ): Promise<ApiResponse<RegisterResponse>> {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      AUTH_ENDPOINTS.REGISTER,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        agreed_to_terms: data.agreed_to_terms,
      },
    );
    return response.data;
  },

  /**
   * Login with email and password
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      AUTH_ENDPOINTS.LOGIN,
      {
        email: data.email,
        password: data.password,
      },
    );
    return response.data;
  },

  /**
   * Get current user profile
   */
  async getMe(): Promise<ApiResponse<AuthMeResponse>> {
    const response = await apiClient.get<ApiResponse<AuthMeResponse>>(
      AUTH_ENDPOINTS.ME,
    );
    return response.data;
  },

  /**
   * Logout (clears token from localStorage and makes logout request if needed)
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      // Even if logout fails, clear local storage
      console.error("Logout error:", error);
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_token");
  },

  /**
   * Get stored user from localStorage
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Store user and token in localStorage
   */
  storeAuthData(user: User, token: string): void {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },
};

export default authService;
