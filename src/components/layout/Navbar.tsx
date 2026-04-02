import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, toggleTheme, themeMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-[#2A2A3E] shadow-sm border-b border-gray-200 dark:border-[#3A3A52]">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-[#E8622A] dark:text-[#F07A3D] cursor-pointer">
            <span>📖</span>
            Meerow
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-[#E8622A] dark:text-[#F07A3D] font-semibold border-b-2 border-[#E8622A] dark:border-[#F07A3D] pb-1"
                  : "text-[#1E1E2E] dark:text-[#FDF6EE] hover:text-[#E8622A] dark:hover:text-[#F07A3D]"
              } transition cursor-pointer`}>
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/author-dashboard"
                  className={`${
                    isActive("/author-dashboard")
                      ? "text-[#E8622A] dark:text-[#F07A3D] font-semibold border-b-2 border-[#E8622A] dark:border-[#F07A3D] pb-1"
                      : "text-[#1E1E2E] dark:text-[#FDF6EE] hover:text-[#E8622A] dark:hover:text-[#F07A3D]"
                  } transition cursor-pointer`}>
                  My Stories
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin/queue"
                    className={`${
                      isActive("/admin/queue")
                        ? "text-[#E8622A] dark:text-[#F07A3D] font-semibold border-b-2 border-[#E8622A] dark:border-[#F07A3D] pb-1"
                        : "text-[#1E1E2E] dark:text-[#FDF6EE] hover:text-[#E8622A] dark:hover:text-[#F07A3D]"
                    } transition cursor-pointer`}>
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3A52] transition cursor-pointer"
              aria-label="Toggle theme">
              {themeMode === "light" ? "🌙" : "☀️"}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#1E1E2E] dark:text-[#FDF6EE]">
                  {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
