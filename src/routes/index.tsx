import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthorDashboard } from "../pages/AuthorDashboard";
import { WriteStory } from "../pages/WriteStory";
import { WriteEpisode } from "../pages/WriteEpisode";
import { StoryDetail } from "../pages/StoryDetail";
import { EpisodeDetail } from "../pages/EpisodeDetail";
// import AdminQueue from '../pages/admin/AdminQueue';
// import AdminReview from '../pages/admin/AdminReview';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Story Routes */}
        <Route path="/story/:slug" element={<StoryDetail />} />
        <Route path="/episode/:episodeId" element={<EpisodeDetail />} />

        {/* Protected Routes */}
        <Route
          path="/author-dashboard"
          element={
            <ProtectedRoute>
              <AuthorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/write-story"
          element={
            <ProtectedRoute>
              <WriteStory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/story/:storyId/write-episode"
          element={
            <ProtectedRoute>
              <WriteEpisode />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/queue"
          element={
            <AdminRoute>
              <div className="p-8">Admin Queue (Coming Soon)</div>
            </AdminRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
