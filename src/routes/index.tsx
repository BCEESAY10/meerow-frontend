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
import { EditStory } from "../pages/EditStory";
import { WriteEpisode } from "../pages/WriteEpisode";
import { EditEpisode } from "../pages/EditEpisode";
import { StoryDetail } from "../pages/StoryDetail";
import { EpisodeDetail } from "../pages/EpisodeDetail";
import AdminQueue from "../pages/admin/AdminQueue";
import AdminReview from "../pages/admin/AdminReview";

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
        <Route
          path="/story/:storyId/episode/:episodeId"
          element={<EpisodeDetail />}
        />
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
          path="/story/:storyId/edit"
          element={
            <ProtectedRoute>
              <EditStory />
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

        <Route
          path="/story/:storyId/episode/:episodeId/edit"
          element={
            <ProtectedRoute>
              <EditEpisode />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/queue"
          element={
            <AdminRoute>
              <AdminQueue />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/review/:type/:id"
          element={
            <AdminRoute>
              <AdminReview />
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
