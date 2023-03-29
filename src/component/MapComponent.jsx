import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import L from "leaflet";

import markerIcon from "../assets/marker.ico";
const MapComponent = ({ position, setPosition, address, setAddress }) => {
  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });
  position;
  return (
    <div>
      {position && Array.isArray(position) ? (
        <MapContainer
          key={position}
          center={position}
          zoom={14}
          className="h-72 rounded-lg"
          scrollWheelZoom={true}
          maxBoundsViscosity={1.0}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker icon={customIcon} draggable={false} position={position}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      ) : null}
    </div>
  );
};

export default MapComponent;
