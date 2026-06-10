"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export default function MapComponent() {
  const position: [number, number] = [39.8283, -98.5795]; // Center of USA

  return (
    <div className="w-full h-full rounded-[32px] overflow-hidden z-0">
      <MapContainer 
        center={position} 
        zoom={4} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", borderRadius: "32px", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            Beautiful USA 🇺🇸
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
