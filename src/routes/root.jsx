// root.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileListingPage from "../pages/ProfileListingPage";
import ProfileDetailsPage from "../pages/ProfileDetailsPage";
import "../index.css";

export function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileListingPage />} />
        <Route path="/profile/:id" element={<ProfileDetailsPage />} />
      </Routes>
    </Router>
  );
}