import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "20px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];

const MapWithMarkers = ({ locations }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAPS_KEY || "",
    libraries,
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting current location", error);
        setCurrentLocation({
          lat: 49.2827,
          lng: -123.1207,
        });
      }
    );
  }, []);

  if (!isLoaded || !currentLocation) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={currentLocation}
      zoom={10}
      options={options}
    >
      {locations.map((location, index) => (
        <MarkerF
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapWithMarkers;
