import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "./google-places-autocomplete.tsx";
import { MapLocation } from "src/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    details: string,
    country: string,
    city: string[],
    locations: MapLocation[],
    notes: string
  ) => void;
  onDelete: () => void;
  currentDetails: string;
  currentCountry: string;
  currentCity: string[];
  currentLocations: MapLocation[];
  currentNotes: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  currentDetails,
  currentCountry,
  currentCity,
  currentLocations,
  currentNotes,
}) => {
  const [details, setDetails] = useState(currentDetails);
  const [country, setCountry] = useState(currentCountry);
  const [city, setCity] = useState(currentCity);
  const [locations, setLocations] = useState(currentLocations);
  const [notes, setNotes] = useState(currentNotes);

  useEffect(() => {
    setDetails(currentDetails);
    setCountry(currentCountry);
    setCity(currentCity);
    setLocations(currentLocations);
    setNotes(currentNotes);
  }, [
    currentDetails,
    currentCountry,
    currentCity,
    currentLocations,
    currentNotes,
  ]);

  const handleLocationSelect = (index: number, location: MapLocation) => {
    const newLocations = [...locations];
    newLocations[index] = location;
    setLocations(newLocations);
  };


  const addLocation = () => {

    setLocations([...locations, { id: "", lat: 0, lng: 0 }]);
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
        {locations.map((_loc, index) => (
          <div key={index} className="mb-2">
            <GooglePlacesAutocomplete
              onSelect={(location) => handleLocationSelect(index, location)}
            />
          </div>
        ))}
        <button
          onClick={addLocation}
          className="mb-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Location
        </button>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onSave(details, country, city, locations, notes)}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;