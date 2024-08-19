import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import Showdown from "showdown";
import GooglePlacesAutocomplete from "../services/api/google-places-autocomplete"; // Adjust the path as needed

// const converter = new Showdown.Converter();
//
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };
//
// const Modal = ({
//   isOpen,
//   onClose,
//   onSave,
//   onDelete,
//   currentDetails,
//   currentCountry,
//   currentCity,
//   currentLocations,
//   currentNotes,
//   currentDate,
// }) => {
//   const [details, setDetails] = useState(currentDetails);
//   const [country, setCountry] = useState(currentCountry);
//   const [city, setCity] = useState(currentCity);
//   const [locations, setLocations] = useState(currentLocations);
//   const [notes, setNotes] = useState(currentNotes);
//   const [date, setDate] = useState(formatDate(currentDate));
//   const [selectedTab, setSelectedTab] = useState("write");
//
//   useEffect(() => {
//     setDetails(currentDetails);
//     setCountry(currentCountry);
//     setCity(currentCity);
//     setLocations(currentLocations);
//     setNotes(currentNotes);
//     setDate(formatDate(currentDate));
//   }, [
//     currentDetails,
//     currentCountry,
//     currentCity,
//     currentLocations,
//     currentNotes,
//     currentDate,
//   ]);
//
//   const handleLocationSelect = (location, index) => {
//     setLocations((prev) => {
//       const newLocations = [...prev];
//       newLocations[index] = location;
//       const newCountry = Array.from(new Set(newLocations.map((loc) => loc.country)));
//       const newCity = Array.from(new Set(newLocations.map((loc) => loc.city)));
//       setCountry(newCountry);
//       setCity(newCity);
//       return newLocations;
//     });
//   };
//
//   const handleAddLocation = () => {
//     setLocations((prev) => [
//       ...prev,
//       { address: "", lat: 0, lng: 0, name: "" },
//     ]);
//   };
//
//   const handleRemoveLocation = (index) => {
//     setLocations((prev) => {
//       const updatedLocations = prev.filter((_, i) => i !== index);
//       const updatedCountry = [...new Set(updatedLocations.map(loc => loc.country))];
//       const updatedCity = [...new Set(updatedLocations.map(loc => loc.city))];
//       setCountry(updatedCountry);
//       setCity(updatedCity);
//       return updatedLocations;
//     });
//   };
//
//   const handleSave = () => {
//     onSave(details, country, city, locations, notes, date);
//   };
//
//   return (
//     isOpen && (
//       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
//           <h2 className="text-xl font-semibold mb-4">Edit Day</h2>
//           <Input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mb-2"
//           />
//           <ReactQuill
//             value={details}
//             onChange={setDetails}
//             className="mb-2"
//           />
//           {locations.map((location, index) => (
//            location.address,
//             <div key={index} className="flex items-center space-x-2 mt-2">
//               <GooglePlacesAutocomplete
//                 onSelect={(location) => handleLocationSelect(location, index)}
//                 defaultValue={location.address} // Set the default value for the input
//
//               />
//               <Button variant="destructive" size="sm" onClick={() => handleRemoveLocation(index)}>
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <div className="flex items-center space-x-2 mt-2">
//             <Button variant="secondary" onClick={handleAddLocation}>
//               Add New Location
//             </Button>
//           </div>
//           <Textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="Notes"
//             className="mb-2"
//           />
//           <div className="flex justify-end space-x-2">
//             <Button variant="secondary" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleSave}>Save</Button>
//             <Button variant="destructive" onClick={onDelete}>
//               Delete
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };
//
// export default Modal;

const converter = new Showdown.Converter();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Modal = ({
                 isOpen,
                 onClose,
                 onSave,
                 onDelete,
                 currentDetails,
                 currentLocations,
                 currentNotes,
                 currentDate,
               }) => {
  const [details, setDetails] = useState("");
  const [locations, setLocations] = useState([]);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(formatDate(new Date())); // Default to today's date
  const [selectedTab, setSelectedTab] = useState("write");

  useEffect(() => {
    if (isOpen) {
      // When the modal opens, set the state based on the props
      setDetails(currentDetails);
      setLocations(currentLocations);
      setNotes(currentNotes);
      setDate(formatDate(currentDate));
    } else {
      // Reset state when the modal closes
      setDetails("");
      setLocations([]);
      setNotes("");
      setDate(formatDate(new Date())); // Reset to today's date or a default value
    }
  }, [
    isOpen,
    currentDetails,
    currentLocations,
    currentNotes,
    currentDate,
  ]);

  const handleLocationSelect = (location, index) => {
    setLocations((prev) => {
      const newLocations = [...prev];
      newLocations[index] = location;
      return newLocations;
    });
  };

  const handleAddLocation = () => {
    setLocations((prev) => [
      ...prev,
      { address: "", lat: 0, lng: 0, name: "" },
    ]);
  };

  const handleRemoveLocation = (index) => {
    setLocations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(details, locations, notes, date);
  };

  return (
      isOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Day</h2>
              <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mb-2"
              />
              <ReactQuill
                  value={details}
                  onChange={setDetails}
                  className="mb-2"
              />
              {locations.map((location, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <GooglePlacesAutocomplete
                        onSelect={(location) => handleLocationSelect(location, index)}
                        defaultValue={location.name} // Set the default value for the input
                    />
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveLocation(index)}>
                      Remove
                    </Button>
                  </div>
              ))}
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="secondary" onClick={handleAddLocation}>
                  Add New Location
                </Button>
              </div>
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
