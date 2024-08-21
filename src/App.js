import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import FlowerListPage from "./pages/FlowerListPage";
import FlowerDetailsPage from "./pages/FlowerDetailsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUsPage from "./components/About";

import UserProfilePage from "./pages/UserProfilePage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import PostCreationForm from "./pages/PostCreationForm";
import EditPostsPage from "./pages/EditPostsPage";
import UpdatePostForm from "./pages/UpdatePostForm";

import MongoDBFlowerDetailsPage from "./pages/FlowerDetailsMongo";

import AdminDashboardPage from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flowers" element={<FlowerListPage />} />
          <Route path="/flower/:id" element={<FlowerDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutUsPage />} />

          {/* Route to user profile page */}
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/update-profile" element={<ProfileUpdatePage />} />
          <Route path="/create-post" element={<PostCreationForm />} />
          <Route path="/edit-post" element={<EditPostsPage />} />

          {/* Posts edit routes */}
          <Route path="/update-post/:id" element={<UpdatePostForm />} />

          {/* Flower from MongoDB */}
          <Route
            path="/flower/mongodb/:id"
            element={<MongoDBFlowerDetailsPage />}
          />{" "}

          {/* Flower from MongoDB */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
