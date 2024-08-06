// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Showdown from "showdown";
// import {
//   updateDayCard,
//   deleteDayCard,
//   reorderDayCards,
//   addDayCard,
//   fetchDayCards
// } from "./../redux/dayTimelineSlice";
// import Modal from "./Modal";
// import ConfirmationModal from "./ConfirmationModal";
// import {
//   DragDropContext,
//   Draggable,
//   Droppable,
// } from "react-beautiful-dnd";
// import DayCard from "./ui/dayCard";
//
// const converter = new Showdown.Converter();
//
// const fetchCountryFlag = async (country) => {
//   if (!country) return "";
//   const response = await fetch(
//     `https://restcountries.com/v3.1/name/${country}`
//   );
//   const data = await response.json();
//   return data[0]?.flags?.svg || "";
// };
//
// const DayTimeline = ({ tripId }) => {
//   const dispatch = useDispatch();
//   const dayCards = useSelector((state) => state.dayTimeline.dayCards);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
//   const [currentCard, setCurrentCard] = useState(null);
//   const [expandedCards, setExpandedCards] = useState([]);
//   const [flags, setFlags] = useState({});
//   const [isAdding, setIsAdding] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("write");
//   const [newDay, setNewDay] = useState({
//     title: "",
//     details: "",
//     country: "",
//     city: [""],
//     locations: [""],
//     notes: "",
//     date: new Date().toISOString().split('T')[0] // Initialize with today's date in YYYY-MM-DD format
//   });
//
//   useEffect(() => {
//     dispatch(fetchDayCards(tripId));
//   }, [dispatch, tripId]);
//
//   useEffect(() => {
//     const fetchFlags = async () => {
//       const newFlags = await Promise.all(
//         dayCards.map(async (day) => {
//           const flag = await fetchCountryFlag(day.country);
//           return { [day._id]: flag };
//         })
//       );
//       setFlags(Object.assign({}, ...newFlags));
//     };
//     fetchFlags();
//   }, [dayCards]);
//
//   const handleCardClick = (id) => {
//     setExpandedCards((prevState) =>
//       prevState.includes(id)
//         ? prevState.filter((cardId) => cardId !== id)
//         : [...prevState, id]
//     );
//   };
//
//   const handleEditClick = (day, e) => {
//     e.stopPropagation(); // Prevent the card click handler from being triggered
//     setCurrentCard(day);
//     setIsModalOpen(true);
//   };
//
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setCurrentCard(null);
//   };
//
//   const handleSaveDetails = async (details, country, city, locations, notes, date) => {
//     if (currentCard) {
//       const updatedDay = {
//         ...currentCard,
//         details,
//         country,
//         city,
//         locations,
//         notes,
//         date
//       };
//       try {
//         const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/${currentCard._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(updatedDay)
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to update day card');
//         }
//
//         const result = await response.json();
//         dispatch(updateDayCard(result));
//         setIsModalOpen(false);
//       } catch (error) {
//         console.error('Error updating day card:', error);
//       }
//     }
//   };
//
//   const handleDeleteClick = () => {
//     setIsConfirmationModalOpen(true);
//   };
//
//   const handleConfirmDelete = async () => {
//     if (currentCard) {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/${currentCard._id}`, {
//           method: 'DELETE'
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to delete day card');
//         }
//
//         dispatch(deleteDayCard(currentCard._id));
//         setIsModalOpen(false);
//         setIsConfirmationModalOpen(false);
//       } catch (error) {
//         console.error('Error deleting day card:', error);
//       }
//     }
//   };
//
//   const handleCancelDelete = () => {
//     setIsConfirmationModalOpen(false);
//   };
//
//   const handleAddNewDay = () => {
//     setIsAdding(true);
//   };
//
//   const handleNewDayChange = (e) => {
//     const { name, value } = e.target;
//     setNewDay((prev) => ({ ...prev, [name]: value }));
//   };
//
//   const handleSaveNewDay = async () => {
//     if (!newDay.title || !newDay.details || !newDay.country || !newDay.city[0] || !newDay.locations[0]) {
//       alert("Please fill in all required fields");
//       return;
//     }
//
//     const dayToSave = {
//       ...newDay,
//       tripId,
//       id: Date.now(), // Use timestamp as unique ID
//     };
//
//     dispatch(addDayCard(dayToSave));
//
//     try {
//       const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(dayToSave)
//       });
//
//       if (!response.ok) {
//         throw new Error('Failed to save day card');
//       }
//
//       const result = await response.json();
//       console.log('Day card saved:', result);
//       setIsAdding(false);
//       setNewDay({
//         title: "",
//         details: "",
//         country: "",
//         city: [""],
//         locations: [""],
//         notes: "",
//         date: new Date().toISOString().split('T')[0] // Reset to today's date
//       });
//     } catch (error) {
//       console.error('Error saving day card:', error);
//     }
//   };
//
//   const onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }
//     const items = Array.from(dayCards);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     dispatch(reorderDayCards(items));
//   };
//
//   return (
//     <div className="day-timeline space-y-4 p-4">
//       {isAdding ? (
//         <div className="space-y-4 p-4 border rounded shadow-lg">
//           <Input
//             type="text"
//             name="title"
//             value={newDay.title}
//             onChange={handleNewDayChange}
//             placeholder="Title"
//             className="input"
//             required
//           />
//           <ReactQuill
//             value={newDay.details}
//             onChange={(value) => setNewDay((prev) => ({ ...prev, details: value }))}
//           />
//           <Input
//             type="text"
//             name="country"
//             value={newDay.country}
//             onChange={handleNewDayChange}
//             placeholder="Country"
//             className="input"
//             required
//           />
//           <Input
//             type="text"
//             name="city"
//             value={newDay.city}
//             onChange={(e) => setNewDay((prev) => ({ ...prev, city: [e.target.value] }))}
//             placeholder="City"
//             className="input"
//             required
//           />
//           <Input
//             type="text"
//             name="locations"
//             value={newDay.locations}
//             onChange={(e) => setNewDay((prev) => ({ ...prev, locations: [e.target.value] }))}
//             placeholder="Locations"
//             className="input"
//             required
//           />
//           <Textarea
//             name="notes"
//             value={newDay.notes}
//             onChange={handleNewDayChange}
//             placeholder="Notes"
//             className="input"
//           />
//           <Input
//             type="date"
//             name="date"
//             value={newDay.date}
//             onChange={handleNewDayChange}
//             className="input"
//             required
//           />
//           <div className="flex justify-end space-x-2">
//             <Button onClick={() => setIsAdding(false)}>Cancel</Button>
//             <Button onClick={handleSaveNewDay}>Save</Button>
//           </div>
//         </div>
//       ) : (
//         <Button onClick={handleAddNewDay} className="mb-4">
//           Add Day
//         </Button>
//       )}
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-4"
//             >
//               {Array.from(dayCards)
//                 .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
//                 .map((day, index) => (
//                   <Draggable
//                     key={day._id}
//                     draggableId={String(day._id)}
//                     index={index}
//                   >
//                     {(provided, snapshot) => (
//                       <DayCard
//                         day={day}
//                         index={index}
//                         flags={flags}
//                         expandedCards={expandedCards}
//                         handleCardClick={handleCardClick}
//                         handleEditClick={handleEditClick}
//                         provided={provided}
//                         snapshot={snapshot}
//                       />
//                     )}
//                   </Draggable>
//                 ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       {currentCard && (
//         <Modal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           onSave={(details, country, city, locations, notes, date) =>
//             handleSaveDetails(details, country, city, locations, notes, date)
//           }
//           onDelete={handleDeleteClick}
//           currentDetails={currentCard.details}
//           currentCountry={currentCard.country}
//           currentCity={currentCard.city}
//           currentLocations={currentCard.locations}
//           currentNotes={currentCard.notes}
//           currentDate={currentCard.date}
//         />
//       )}
//       <ConfirmationModal
//         isOpen={isConfirmationModalOpen}
//         onClose={handleCancelDelete}
//         onConfirm={handleConfirmDelete}
//         message="Are you sure you want to delete this card?"
//       />
//     </div>
//   );
// };
//
// export default DayTimeline;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Showdown from "showdown";
import {
  updateDayCard,
  deleteDayCard,
  reorderDayCards,
  addDayCard,
  fetchDayCards
} from "./../redux/dayTimelineSlice";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import DayCard from "./ui/dayCard";

const converter = new Showdown.Converter();

const fetchCountryFlag = async (country) => {
  if (!country) return "";
  const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
  );
  const data = await response.json();
  return data[0]?.flags?.svg || "";
};

const DayTimeline = ({ tripId }) => {
  const dispatch = useDispatch();
  const dayCards = useSelector((state) => state.dayTimeline.dayCards);
  const token = useSelector((state) => state.auth.token); // Get token from state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [expandedCards, setExpandedCards] = useState([]);
  const [flags, setFlags] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTab, setSelectedTab] = useState("write");
  const [newDay, setNewDay] = useState({
    title: "",
    details: "",
    country: "",
    city: [""],
    locations: [""],
    notes: "",
    date: new Date().toISOString().split('T')[0] // Initialize with today's date in YYYY-MM-DD format
  });

  useEffect(() => {
    dispatch(fetchDayCards({ tripId, token })); // Pass token to thunk
  }, [dispatch, tripId, token]);

  useEffect(() => {
    const fetchFlags = async () => {
      const newFlags = await Promise.all(
          dayCards.map(async (day) => {
            const flag = await fetchCountryFlag(day.country);
            return { [day._id]: flag };
          })
      );
      setFlags(Object.assign({}, ...newFlags));
    };
    fetchFlags();
  }, [dayCards]);

  const handleCardClick = (id) => {
    setExpandedCards((prevState) =>
        prevState.includes(id)
            ? prevState.filter((cardId) => cardId !== id)
            : [...prevState, id]
    );
  };

  const handleEditClick = (day, e) => {
    e.stopPropagation(); // Prevent the card click handler from being triggered
    setCurrentCard(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCard(null);
  };

  const handleSaveDetails = async (details, country, city, locations, notes, date) => {
    if (currentCard) {
      const updatedDay = {
        ...currentCard,
        details,
        country,
        city,
        locations,
        notes,
        date
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/${currentCard._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Include token in request headers
          },
          credentials: 'include',
          body: JSON.stringify(updatedDay)
        });

        if (!response.ok) {
          throw new Error('Failed to update day card');
        }

        const result = await response.json();
        dispatch(updateDayCard(result));
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating day card:', error);
      }
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (currentCard) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/${currentCard._id}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': token // Include token in request headers
          }, credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to delete day card');
        }

        dispatch(deleteDayCard(currentCard._id));
        setIsModalOpen(false);
        setIsConfirmationModalOpen(false);
      } catch (error) {
        console.error('Error deleting day card:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleAddNewDay = () => {
    setIsAdding(true);
  };

  const handleNewDayChange = (e) => {
    const { name, value } = e.target;
    setNewDay((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewDay = async () => {
    if (!newDay.title || !newDay.details || !newDay.country || !newDay.city[0] || !newDay.locations[0]) {
      alert("Please fill in all required fields");
      return;
    }

    const dayToSave = {
      ...newDay,
      tripId,
      id: Date.now(), // Use timestamp as unique ID
    };

    dispatch(addDayCard(dayToSave));

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Include token in request headers
        },
        credentials: 'include',
        body: JSON.stringify(dayToSave)
      });

      if (!response.ok) {
        throw new Error('Failed to save day card');
      }

      const result = await response.json();
      console.log('Day card saved:', result);
      setIsAdding(false);
      setNewDay({
        title: "",
        details: "",
        country: "",
        city: [""],
        locations: [""],
        notes: "",
        date: new Date().toISOString().split('T')[0] // Reset to today's date
      });
    } catch (error) {
      console.error('Error saving day card:', error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(dayCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderDayCards(items));
  };

  return (
      <div className="day-timeline space-y-4 p-4">
        {isAdding ? (
            <div className="space-y-4 p-4 border rounded shadow-lg">
              <Input
                  type="text"
                  name="title"
                  value={newDay.title}
                  onChange={handleNewDayChange}
                  placeholder="Title"
                  className="input"
                  required
              />
              <ReactQuill
                  value={newDay.details}
                  onChange={(value) => setNewDay((prev) => ({ ...prev, details: value }))}
              />
              <Input
                  type="text"
                  name="country"
                  value={newDay.country}
                  onChange={handleNewDayChange}
                  placeholder="Country"
                  className="input"
                  required
              />
              <Input
                  type="text"
                  name="city"
                  value={newDay.city}
                  onChange={(e) => setNewDay((prev) => ({ ...prev, city: [e.target.value] }))}
                  placeholder="City"
                  className="input"
                  required
              />
              <Input
                  type="text"
                  name="locations"
                  value={newDay.locations}
                  onChange={(e) => setNewDay((prev) => ({ ...prev, locations: [e.target.value] }))}
                  placeholder="Locations"
                  className="input"
                  required
              />
              <Textarea
                  name="notes"
                  value={newDay.notes}
                  onChange={handleNewDayChange}
                  placeholder="Notes"
                  className="input"
              />
              <Input
                  type="date"
                  name="date"
                  value={newDay.date}
                  onChange={handleNewDayChange}
                  className="input"
                  required
              />
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button onClick={handleSaveNewDay}>Save</Button>
              </div>
            </div>
        ) : (
            <Button onClick={handleAddNewDay} className="mb-4">
              Add Day
            </Button>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                >
                  {Array.from(dayCards)
                      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
                      .map((day, index) => (
                          <Draggable
                              key={day._id}
                              draggableId={String(day._id)}
                              index={index}
                          >
                            {(provided, snapshot) => (
                                <DayCard
                                    day={day}
                                    index={index}
                                    flags={flags}
                                    expandedCards={expandedCards}
                                    handleCardClick={handleCardClick}
                                    handleEditClick={handleEditClick}
                                    provided={provided}
                                    snapshot={snapshot}
                                />
                            )}
                          </Draggable>
                      ))}
                  {provided.placeholder}
                </div>
            )}
          </Droppable>
        </DragDropContext>
        {currentCard && (
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={(details, country, city, locations, notes, date) =>
                    handleSaveDetails(details, country, city, locations, notes, date)
                }
                onDelete={handleDeleteClick}
                currentDetails={currentCard.details}
                currentCountry={currentCard.country}
                currentCity={currentCard.city}
                currentLocations={currentCard.locations}
                currentNotes={currentCard.notes}
                currentDate={currentCard.date}
            />
        )}
        <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            message="Are you sure you want to delete this card?"
        />
      </div>
  );
};

export default DayTimeline;


