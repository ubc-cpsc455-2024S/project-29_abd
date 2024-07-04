import React, { useRef, useEffect, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { MapLocation } from "@/types";

const libraries: "places"[] = ["places"];

interface GooglePlacesAutocompleteProps {
  onSelect: (location: MapLocation) => void;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  onSelect,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_SECRET || "",
    libraries,
  });
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);

  const onPlaceChanged = useCallback(() => {
    if (!autoCompleteRef.current) return;
    const autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        types: ["address"],
        //componentRestrictions: { country: "ca" },
      },
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
      className="w-[280px] justify-start text-left font-normal"
      type="text"
      placeholder="Enter a location"
      ref={autoCompleteRef}
    />
  );
};

export default GooglePlacesAutocomplete;
