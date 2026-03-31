import { createContext } from "react";
import type { User } from "../types/user.types";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  themeMode: "light" | "dark";
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
