import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [18.944, 72.823]; // Marine Drive, Mumbai coordinates

  return (
    <MapContainer center={position} zoom={15} style={{ height: "400px", width: "100%" }}>
      {/* Map Tiles from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker on Marine Drive */}
      <Marker position={position}>
        <Popup>Marine Drive, Mumbai</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
