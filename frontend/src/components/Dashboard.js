import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:5000/api/reviews/user/1", { headers });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); 
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="dashboard-header">
          <FaUserCircle className="user-icon" />
          <h2 className="dashboard-title">User Dashboard</h2>
        </div>
        <ul className="dashboard-menu">
          <li className={activeSection === "Profile" ? "active" : ""} onClick={() => setActiveSection("Profile")}>
            Profile
          </li>
          <li className={activeSection === "Reviews" ? "active" : ""} onClick={() => setActiveSection("Reviews")}>
            Reviews Submitted
          </li>
          <li className={activeSection === "Wishlist" ? "active" : ""} onClick={() => setActiveSection("Wishlist")}>
            Wishlist
          </li>
          <li className={activeSection === "Display" ? "active" : ""} onClick={() => setActiveSection("Display")}>
            Display
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* ✅ Added onClick */}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeSection === "Profile" && <div className="profile-section">Profile Content</div>}
        {activeSection === "Reviews" && (
          <div className="reviews-section">
            <h3>Reviews Submitted</h3>
            {reviews.length > 0 ? (
              <ul className="reviews-list">
                {reviews.map((review) => (
                  <li key={review.id} className="review-item">
                    <div className="review-header">
                      <strong>{review.username}</strong>
                      <span className="review-rating">⭐ {review.rating}</span>
                    </div>
                    <p className="review-text">{review.review_text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews submitted yet.</p>
            )}
          </div>
        )}
        {activeSection === "Wishlist" && <div className="wishlist-section">Wishlist Content</div>}
        {activeSection === "Display" && <div className="display-section">Display Content</div>}
      </div>
    </div>
  );
};

export default Dashboard;
