import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaUserCircle } from "react-icons/fa"; // Added User Profile Icon
import "../styles/Navbar.css";

const Navbar = ({ onAboutContactClick }) => { // Accept the function as a prop
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const user = localStorage.getItem("token"); // Check if user is logged in

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${visible ? "" : "hidden"}`}>
      <div className="logo">
        <FaGlobe className="logo-icon" />
        <span className="urban-text">URBAN</span>
        <span className="vista-text">VISTA</span>
      </div>

      <div className="nav-links">
        {/* "Home" link should navigate to the home page */}
        <Link to="/" className="nav-link">Home</Link>

        {/* "About" and "Contact" links should scroll to their respective sections */}
        <button onClick={onAboutContactClick} className="nav-link">About</button>
        <button onClick={onAboutContactClick} className="nav-link">Contact</button>

        {/* Show Sign Up & Login if no user is logged in */}
        {!user ? (
          <>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
            <Link to="/login" className="nav-btn">Login</Link>
          </>
        ) : (
          // Show User Profile Icon when logged in
          <Link to="/dashboard" className="profile-link">
            <FaUserCircle className="profile-icon" title="Dashboard" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
