import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Review.css";

const Review = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    username: "",
    rating: 0,
    text: "",
  });

  // Fetch reviews for the location when the component loads
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${placeId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [placeId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Submit new review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.username || !newReview.rating || !newReview.text) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const reviewData = {
      user_id: 1, // Replace with actual logged-in user ID
      location_id: placeId,
      username: newReview.username,
      rating: newReview.rating,
      text: newReview.text,
    };

    axios
      .post("http://localhost:5000/api/reviews/", reviewData)
      .then((response) => {
        alert("Review posted successfully!");
        setReviews([...reviews, reviewData]); // Update UI
        setNewReview({ username: "", rating: 0, text: "" }); // Reset form
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };

  return (
    <div className="review-section">
      <h2 className="review-title">User Reviews</h2>
      <div className="review-container">
        {/* Left Side: Reviews List */}
        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <strong>{review.username}</strong> ⭐ {review.rating}
                <p>{review.review_text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave one!</p>
          )}
        </div>

        {/* Right Side: Submit Review Form */}
        <div className="review-form">
          <h3 className="leave">Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={newReview.username}
              onChange={handleInputChange}
              required
            />
            <select name="rating" value={newReview.rating} onChange={handleInputChange} required>
              <option value="0">Select Rating</option>
              <option value="5">⭐ 5</option>
              <option value="4">⭐ 4</option>
              <option value="3">⭐ 3</option>
              <option value="2">⭐ 2</option>
              <option value="1">⭐ 1</option>
            </select>
            <textarea
              name="text"
              placeholder="Write your review..."
              value={newReview.text}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
