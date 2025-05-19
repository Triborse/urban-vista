import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/Mumbai.css";
import Navbar from "./Navbar";

const Mumbai = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scrolling
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close menu after clicking
  };

  // Common structure for sections
  const renderGrid = (title, id, places) => (
    <section id={id} className="mumbai-section">
      <h2 className="section-title">{title}</h2>
      <div className="attractions-grid">
        {places.map((place) => (
          <div key={place.id} className="card" onClick={() => navigate(`/${place.id}`)}>
            <img src={`/images/${place.img}`} alt={place.name} className="card-image" />
            <h3>{place.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="mumbai-container">
      <Navbar />

      {/* 🏙️ Mumbai Header */}
      <header className="mumbai-header" style={{ backgroundImage: `url("/images/image9.avif")` }}>
        <div className="mumbai-bg">
          <h1 className="mumbai-title">Welcome to Mumbai</h1>
          <p className="mumbai-info">
            Mumbai, the city of dreams, is the financial capital of India and home to Bollywood.
            A vibrant blend of history, culture, and modernity, it offers iconic landmarks, bustling
            markets, and scenic coastal views. From street food to skyscrapers, Mumbai promises an
            unforgettable experience.
          </p>
        </div>
      </header>

      {/* 🍔 Hamburger Menu Button */}
      <IconButton className="hamburger-btn" onClick={() => setIsOpen(true)}>
        <MenuIcon fontSize="large" style={{ color: "white" }} />
      </IconButton>

      {/* 📌 Sidebar Drawer */}
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <List className="menu-list">
          {["Attractions", "Temples", "Hotels", "Restaurants"].map((section) => (
            <ListItem button key={section} onClick={() => scrollToSection(section.toLowerCase())}>
              <ListItemText primary={section} />
            </ListItem>
          ))}
          <ListItem button onClick={() => navigate("/city-map")}>
            <ListItemText primary="City Map" />
          </ListItem>
        </List>
      </Drawer>

      {/* 📍 Scrollable Sections */}
      <div className="scrollable-content">
        {renderGrid("Top Attractions in Mumbai", "attractions", [
          { id: "marine-drive", name: "Marine Drive", img: "mum.jpg" },
          { id: "gateway-of-india", name: "Gateway of India", img: "gatew.jpeg" },
          { id: "siddhivinayak", name: "Shree Siddhivinayak", img: "siddhi.jpeg" },
          { id: "elephanta-caves", name: "Elephanta Caves", img: "ele.jpeg" },
          { id: "haji-ali", name: "Haji Ali Dargah", img: "haji.jpeg" },
          { id: "juhu-beach", name: "Juhu Beach", img: "juhu.jpeg" },
          { id: "terminus", name: "Chhatrapati Shivaji Terminus", img: "ter.jpg" },
        ])}

       

        {renderGrid("Best Hotels", "hotels", [
          { id: "taj-hotel", name: "The Taj Mahal Palace", img: "taj.jpg" },
          { id: "st-regis", name: "The St. Regis Mumbai", img: "reg.jpg" },
          { id: "trident", name: "Trident, Nariman Point", img: "TRI.jpg" },
          { id: "T2 Beacon", name: "T2 Beacon,Andheri", img: "T2.jpg" },
          { id: "the westin", name: "The Westin,Powai", img: "west.jpg" },
          { id: "jw", name: "Jw Marriot Juhu", img: "jw.jpg" },
        ])}

        
        {renderGrid("Famous Temples", "temples", [
          { id: "siddhivinayak", name: "Shree Siddhivinayak Temple", img: "siddhi.jpeg" },
          { id: "mahalaxmi-temple", name: "Mahalaxmi Temple", img: "maha.jpg" },
          { id: "babulnath-temple", name: "Babulnath Temple", img: "bab.jpg" },
          { id: "ISKCON-temple", name: "ISKCON Temple", img: "IS.jpeg" },
        ])}   

        {renderGrid("Popular Restaurants", "restaurants", [
          { id: "leopold", name: "Leopold Cafe", img: "leo.jpeg" },
          { id: "bademiya", name: "Bademiya", img: "bade.jpeg" },
          { id: "pizza", name: "Pizza by the Bay", img: "pizza.jpeg" },
          { id: "namak", name: "Namak", img: "namak.jpg" },
          { id: "amazonia", name: "Amazonia", img: "ama.jpeg" },

        ])}
      </div>
    </div>
  );
};

export default Mumbai;
