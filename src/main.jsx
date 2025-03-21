import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import ProfileListingPage from "./pages/ProfileListingPage";
import ProfileDetailsPage from "./pages/ProfileDetailsPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ProfileListingPage />} />
          <Route path="/profile/:id" element={<ProfileDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
