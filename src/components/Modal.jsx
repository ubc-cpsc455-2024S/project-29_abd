import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import Showdown from "showdown";

const converter = new Showdown.Converter();

const Modal = ({
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
  const [selectedTab, setSelectedTab] = useState("write");

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

  const handleSave = () => {
    onSave(details, country, city, locations, notes);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Edit Day</h2>
          <ReactQuill
            value={details}
            onChange={setDetails}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            childProps={{
              writeButton: {
                tabIndex: -1,
              },
            }}
          />
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="mb-2"
          />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="mb-2"
          />
          <Input
            value={locations}
            onChange={(e) =>
              setLocations(e.target.value.split(","))
            }
            placeholder="Locations (comma separated)"
            className="mb-2"
          />
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="mb-2"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
