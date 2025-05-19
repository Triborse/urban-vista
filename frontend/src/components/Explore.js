import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Explore.css";
import { FaSearch } from "react-icons/fa"; // Importing the search icon
import ChatbotComponent from "./Chatbot";

const cities = [
  { name: "Mumbai", image: "/images/mum.jpg", path: "/mumbai" },
  { name: "Delhi", image: "/images/del.jpg" },
  { name: "Bangalore", image: "/images/banglo.jpg" },
  { name: "Kolkata", image: "/images/kol.jpg" },
  { name: "Chennai", image: "/images/chen.jpg" },
  { name: "Pondicherry", image: "/images/image10.avif" },
  { name: "Jaipur", image: "/images/image5.jpg" },
  { name: "Udaipur", image: "/images/ud.jpg" },
  { name: "Agra", image: "/images/ag.jpg" },
  { name: "Amritsar", image: "/images/gold.jpg" },
  { name: "Manali", image: "/images/man.jpg" },
  { name: "Munnar", image: "/images/mun.jpg" },
  { name: "Darjeeling", image: "/images/dar.jpg" },



];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter cities based on search term
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Explore Section */}
      <div id="explore" className="explore-container">
        <h2 className="explore-title">Explore Cities..</h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        {/* City Grid */}
        <div className="city-grid">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className="city-card"
              onClick={() =>
                city.path ? navigate(city.path) : alert("Coming Soon!")
              }
            >
              <img src={city.image} alt={city.name} className="city-image" />
              <div className="city-overlay">
                <span className="city-name">{city.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chatbot should only appear in the Explore section */}
        <ChatbotComponent />
      </div>

      {/* About Us & Contact Us Section */}
      <div id="about-contact" className="about-contact-container">
        <div className="contact-us">
          <h3>Contact Us</h3>
          <p>Email: support@urbanvista.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: UrbanVista HQ, Mumbai, India</p>
        </div>
        <div className="about-us">
          <h3>About Us</h3>
          <p>
            Welcome to <strong>UrbanVista</strong>! Our goal is to help you
            explore cities seamlessly, providing top recommendations for hotels,
            restaurants, and attractions. Whether you're a traveler or a local,
            UrbanVista has something for everyone.
          </p>
        </div>
      </div>

      {/* Copyright Footer */}
      <p className="copyright">© Copyright UrbanVista 2025</p>
    </div>
  );
};

export default Explore;
