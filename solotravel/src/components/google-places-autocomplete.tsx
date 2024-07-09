import React, { useRef, useEffect, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { MapLocation } from "src/types";

const libraries: "places"[] = ["places"];

interface GooglePlacesAutocompleteProps {
  onSelect: (location: MapLocation) => void;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  onSelect,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDMK-rt59bguIRTg-uNl5Eu53GEm9bBlX0" || "",
    libraries,
  });
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);

  const onPlaceChanged = useCallback(() => {
    if (!autoCompleteRef.current) return;
    const autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        types: ["address"],
        // componentRestrictions: { country: "ca" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location: MapLocation = {
          id: place.place_id || "unknown",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onSelect(location);
      } else {
        console.error("Place has no geometry");
        // Optionally, handle the case where the place has no geometry information
      }
    });
  }, [onSelect]);

  useEffect(() => {
    if (isLoaded) {
      onPlaceChanged();
    }
  }, [isLoaded, onPlaceChanged]);

  return (
    <input
      className="w-full p-2 border border-gray-300 rounded"
      type="text"
      placeholder="Enter a location"
      ref={autoCompleteRef}
    />
  );
};

export default GooglePlacesAutocomplete;
