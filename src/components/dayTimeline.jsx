import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "../services/api/google-places-autocomplete";
import { Button } from "./ui/button";
import { Label } from "./ui/label.jsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Showdown from "showdown";
import {
  updateDayCard,
  deleteDayCard,
  addDayCard,
  fetchDayCards,
} from "../redux/dayTimelineSlice";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import DayCard from "./ui/dayCard";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CollapseAllSwitch } from './ui/collapse-all-switch';

const converter = new Showdown.Converter();

const DayTimeline = forwardRef(({ tripId, onDaysUpdated }, ref) => {
  const dispatch = useDispatch();
  const dayCards = useSelector((state) => state.dayTimeline.dayCards);
  const token = useSelector((state) => state.auth.token); // Get token from state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [expandedCards, setExpandedCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isCollapseAllChecked, setIsCollapseAllChecked] = useState(false);
  const [newDay, setNewDay] = useState({
    title: "",
    details: "",
    locations: [],
    notes: "",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (tripId && token) {
      dispatch(fetchDayCards({ tripId, token }));
    }
  }, [dispatch, tripId, token]);


  useImperativeHandle(ref, () => ({
    expandAll() {
      toggleCollapseAll(true);
    }
  }));

  const handleCardClick = (id) => {
    setExpandedCards((prevState) =>
        prevState.includes(id)
            ? prevState.filter((cardId) => cardId !== id)
            : [...prevState, id]
    );
  };

  const handleEditClick = (day, e) => {
    e.stopPropagation();
    setCurrentCard(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCard(null);
  };

  const handleSaveDetails = async (details, locations, notes, date) => {
    if (currentCard) {
      const updatedDay = {
        ...currentCard,
        details,
        locations,
        notes,
        date
      };
      try {
        console.log("Updating day card:", updatedDay);
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/${currentCard._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Include token in request headers
          },
          credentials: 'include',
          body: JSON.stringify(updatedDay)
        });

        const responseText = await response.text();
        if (!response.ok) {
          console.error("Response status:", response.status);
          console.error("Response text:", responseText);
          let errorData;
          try {
            errorData = JSON.parse(responseText);
          } catch (e) {
            throw new Error(responseText);
          }
          console.error("Failed to update day card:", errorData);
          throw new Error('Failed to update day card');
        }

        const result = JSON.parse(responseText);
        dispatch(updateDayCard(result));
        setIsModalOpen(false);
        if (onDaysUpdated) onDaysUpdated();
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
        if (onDaysUpdated) onDaysUpdated();
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

  const handleLocationSelect = async (location, index) => {
    setNewDay((prev) => {
      const newLocations = [...prev.locations];
      newLocations[index] = location;
      return {
        ...prev,
        locations: newLocations
      };
    });
  };

  const handleAddLocation = () => {
    setNewDay((prev) => ({
      ...prev,
      locations: [...prev.locations, { address: "", lat: 0, lng: 0, name: "" }]
    }));
  };

  const handleRemoveLocation = (index) => {
    setNewDay((prev) => {
      const updatedLocations = prev.locations.filter((_, i) => i !== index);
      return {
        ...prev,
        locations: updatedLocations
      };
    });
  };

  const handleSaveNewDay = async () => {
    if (!newDay.title || !newDay.details || !newDay.locations.length) {
      alert("Please fill in all required fields");
      return;
    }

    const dayToSave = {
      ...newDay,
      tripId,
      id: Date.now(),
    };

    dispatch(addDayCard(dayToSave));

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
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
        locations: [],
        notes: "",
        date: new Date().toISOString().split('T')[0]
      });
      if (onDaysUpdated) onDaysUpdated();
    } catch (error) {
      console.error('Error saving day card:', error);
    }
  };

  const toggleCollapseAll = (checked) => {
    setIsCollapseAllChecked(checked);
    if (checked) {
      setExpandedCards(dayCards.map((day) => day._id));
    } else {
      setExpandedCards([]);
    }
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
              {newDay.locations.map((location, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <GooglePlacesAutocomplete
                        onSelect={(location) => handleLocationSelect(location, index)}
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

            <div className="flex flex-col items-end space-y-2 p-4">
              <Button onClick={handleAddNewDay} className="mb-4">
                Add Day
              </Button>
              <div className="flex items-center space-x-2">
                <Label>Expand All</Label>
                <CollapseAllSwitch isChecked={isCollapseAllChecked} onToggle={toggleCollapseAll} />
              </div>
            </div>
        )}

        <div className="space-y-4">
          {Array.from(dayCards)
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((day, index) => (
                  <DayCard
                      key={day._id}
                      day={day}
                      index={index}
                      expandedCards={expandedCards}
                      handleCardClick={handleCardClick}
                      handleEditClick={handleEditClick}
                  />
              ))}
        </div>
        {currentCard && (
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={(details, locations, notes, date) =>
                    handleSaveDetails(details, locations, notes, date)
                }
                onDelete={handleDeleteClick}
                currentDetails={currentCard.details}
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
});

export default DayTimeline;