import React, { useRef, useEffect, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Input } from "../../components/ui/input";

// Define the libraries array as mutable
const libraries = ["places"];

const GooglePlacesAutocomplete = ({ onSelect, defaultValue = "" }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAPS_KEY || "",
    libraries,
  });
  const autoCompleteRef = useRef(null);

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
        const location = {
          id: place.place_id || "unknown",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address || "",
          name: place.name || ""
        };
        console.log(location);
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
    <Input
      className="w-full p-2 border border-gray-300 rounded"
      type="text"
      placeholder="Enter a location"
      ref={autoCompleteRef}
      defaultValue={defaultValue}
    />
  );
};

export default GooglePlacesAutocomplete;