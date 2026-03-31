import React, { useState, useCallback, useEffect } from "react";
import type { User } from "../types/user.types";
import authService from "../services/auth.service";
import type { AuthContextType } from "./AuthContext";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Check for stored user data
      const storedUser = authService.getStoredUser();
      if (storedUser && authService.isAuthenticated()) {
        setUser(storedUser);
      }

      // Load theme preference
      const savedTheme = localStorage.getItem("theme_mode") as
        | "light"
        | "dark"
        | null;

      let theme: "light" | "dark" = "light";

      if (savedTheme) {
        theme = savedTheme;
      } else {
        // Check system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        theme = prefersDark ? "dark" : "light";
      }

      setThemeMode(theme);

      // Apply theme to DOM immediately
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Update DOM theme whenever themeMode changes
  useEffect(() => {
    console.log("Theme changed to:", themeMode);
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  const handleLogin = useCallback((userData: User, token: string) => {
    authService.storeAuthData(userData, token);
    setUser(userData);
  }, []);

  const handleLogout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setThemeMode((prevMode) => {
      const newTheme = prevMode === "light" ? "dark" : "light";
      console.log("Toggling theme from", prevMode, "to", newTheme);
      localStorage.setItem("theme_mode", newTheme);
      return newTheme;
    });
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    themeMode,
    login: handleLogin,
    logout: handleLogout,
    setUser,
    toggleTheme: handleToggleTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
