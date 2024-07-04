import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { MapLocation } from "@/types";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "20px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// Define the libraries array as mutable
const libraries: ("places")[] = ["places"];

export default function MapWithMarkers({ locations }: { locations: MapLocation[] }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDMK-rt59bguIRTg-uNl5Eu53GEm9bBlX0",
    libraries,
  });

  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

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
        // Fallback to default center if geolocation fails
        setCurrentLocation({
          lat: 49.2827,
          lng: -123.1207,
        });
      }
    );
  }, []);

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded || !currentLocation) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={currentLocation}
      zoom={10}
      options={options}
    >
      {locations.map((location) => (
        <MarkerF
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
        />
      ))}
    </GoogleMap>
  );
}
