import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MapLocation } from "@/types";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "20px",
};

const center = {
  lat: 49.2827,
  lng: -123.1207,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function MapWithMarkers({
  locations,
}: {
  locations: MapLocation[];
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDMK-rt59bguIRTg-uNl5Eu53GEm9bBlX0" || "",
    libraries: ["places"],
  });

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      options={options}
    >
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
        />
      ))}
    </GoogleMap>
  );
}
