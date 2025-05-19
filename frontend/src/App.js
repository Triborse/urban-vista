import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Mumbai from "./components/Mumbai";
import Delhi from "./components/Delhi";
import Explore from "./components/Explore";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import MarineDrive from "./components/MarineDrive";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

const HomeWithExplore = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <Home onExploreClick={handleExploreClick} />
      <Explore />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeWithExplore />} />
        <Route path="/mumbai" element={<Mumbai />} />
        <Route path="/delhi" element={<Delhi />} />
        <Route path="/marine-drive" element={<MarineDrive />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
