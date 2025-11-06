// src/Utility/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase"; // your firebase config

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Show loading while Firebase checks auth state
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    // Not logged in — redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in — render children (protected page)
  return children;
}
