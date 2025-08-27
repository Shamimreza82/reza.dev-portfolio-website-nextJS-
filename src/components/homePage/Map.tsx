
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const ICON = icon({ iconUrl: "/marker.png", iconSize: [32, 32] });

const Map = () => {
  return (
    <MapContainer
      center={[23.8103, 90.4125]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[500px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[23.8103, 90.4125]} icon={ICON}>
        <Popup>Dhaka, Bangladesh</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
