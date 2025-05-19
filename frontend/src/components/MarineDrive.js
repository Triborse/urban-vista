import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MarineDrive.css";
import Review from "../components/Review"; // Importing the Review component

const MarineDrive = () => {
  const position = [18.944, 72.823];

  return (
    <div className="marine-container">
      <div className="marine-header">
        <h1 className="marine-title">Marine Drive</h1>
        <p className="timing">🟢 Open Now | Closes at 3 AM</p>
      </div>

      <div className="marine-content">
        <div className="image-container">
          <img src="./images/mum.jpg" alt="Marine Drive" className="marine-image" />
        </div>
        <div className="about-section">
          <h2 className="bold-heading">About Marine Drive</h2>
          <p>
            Marine Drive is a 3.6 km long boulevard in South Mumbai, forming a
            natural bay along the Arabian Sea. It is famously known as the
            "Queen's Necklace" due to the dazzling streetlights resembling a
            string of pearls at night.
          </p>
          <p>
            It offers a breathtaking view of the Mumbai skyline and serves as a
            popular destination for jogging, sunset watching, and enjoying
            street food such as bhel puri and vada pav.
          </p>
        </div>
      </div>

      <div className="map-container">
        <MapContainer center={position} zoom={14} className="leaflet-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Marine Drive, Mumbai</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Integrated Review Component */}
      <div className="reviews-section">
        <Review placeId="marine-drive" />
      </div>
    </div>
  );
};

export default MarineDrive;
