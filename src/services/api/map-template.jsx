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
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (locations && locations.length > 0) {
      // Calculate the average latitude and longitude for centering the map
      const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
      setCenter({ lat: avgLat, lng: avgLng });
    } else {
      // Fallback to user's current location if no locations are provided
      navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting current location", error);
            setCenter({
              lat: 49.2827,
              lng: -123.1207,
            }); // Default to Vancouver, BC
          }
      );
    }
  }, [locations]);

  if (!isLoaded || !center) return <div>Loading...</div>;

  return (
      <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
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
