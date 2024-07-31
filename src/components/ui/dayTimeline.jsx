import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import {Button} from "./button"; 
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  updateDayCard,
  deleteDayCard,
  reorderDayCards,
  addDayCard,
} from "../../redux/dayTimelineSlice";
import Modal from "../Modal";
import ConfirmationModal from "../ConfirmationModal";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import styles from "./dayTimeline.module.css";

const fetchCountryFlag = async (country) => {
  if (!country) return "";
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const data = await response.json();
  return data[0]?.flags?.svg || "";
};

const DayTimeline = () => {
  const dispatch = useDispatch();
  const dayCards = useSelector(
    (state) => state.dayTimeline.dayCards
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [expandedCards, setExpandedCards] = useState([]);
  const [flags, setFlags] = useState({});

  useEffect(() => {
    const fetchFlags = async () => {
      const newFlags = await Promise.all(
        dayCards.map(async (day) => {
          const flag = await fetchCountryFlag(day.country);
          return { [day.id]: flag };
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

  const handleSaveDetails = async (details, country, city, locations, notes) => {
    if (currentCard) {
      const updatedDay = {
        ...currentCard,
        details,
        country,
        city,
        locations,
        notes,
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/${currentCard.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
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
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/${currentCard.id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete day card');
        }

        dispatch(deleteDayCard(currentCard.id));
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

  const handleAddNewDay = async () => {
    const newDay = {
      id: Date.now(), // Use timestamp as unique ID
      title: "New Day", // Generic title
      details: "Enter details here", // Generic details
      country: "Country",
      city: ["City1", "City2"],
      locations: ["Location1", "Location2"],
      notes: "Notes",
    };
    console.log(JSON.stringify(newDay));
    dispatch(addDayCard(newDay));

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDay)
      });

      console.log("Error:  ", response);
      if (!response.ok) {
        console.log("ERROR!!!:   " ,`${process.env.REACT_APP_API_URL}/day-cards`)
        throw new Error('Failed to save day card');
      }

      const result = await response.json();
      console.log('Day card saved:', result);
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
      <Button onClick={handleAddNewDay} className="mb-4">
        Add Day
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {dayCards.map((day, index) => (
                <Draggable
                  key={day.id}
                  draggableId={String(day.id)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} // Apply dragHandleProps to the handle area
                      className={`${styles.card} ${
                        snapshot.isDragging ? styles.cardDragging : ""
                      } ${
                        expandedCards.includes(day.id)
                          ? styles.cardExpanded
                          : styles.cardCollapsed
                      } cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                      style={{
                        ...provided.draggableProps.style,
                        transition: snapshot.isDragging
                          ? "none"
                          : "all 0.3s ease",
                      }}
                      onClick={() => handleCardClick(day.id)}
                    >
                      <Card>
                        <CardHeader className={styles.cardHeader}>
                          <CardTitle className={styles.cardTitle}>{`Day ${
                            index + 1
                          }`}</CardTitle>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <Button
                                variant="secondary"
                                className={`${styles.button} ${styles.smallButton}`}
                                onClick={(e) => handleEditClick(day, e)}
                              >
                                Edit
                              </Button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content className="bg-black text-white p-2 rounded shadow-lg">
                                Edit details
                                <Tooltip.Arrow className="fill-black" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </CardHeader>
                        <CardContent
                          className={`${styles.cardContent} ${
                            expandedCards.includes(day.id)
                              ? styles.cardContentVisible
                              : styles.cardContentHidden
                          }`}
                        >
                          <div>
                            <div className="flex items-center">
                              {flags[day.id] && (
                                <img
                                  src={flags[day.id]}
                                  alt={`${day.country} flag`}
                                  className={styles.flag}
                                />
                              )}
                              <span className={styles.location}>
                                {day.country} {day.city.join(", ")}
                              </span>{" "}
                              {/* Display country and cities */}
                            </div>
                            {expandedCards.includes(day.id) && (
                              <>
                                <span className={styles.details}>
                                  {day.details}
                                </span>
                                <span className={styles.location}>
                                  {day.locations.join(", ")}
                                </span>{" "}
                                {/* Display locations */}
                                <span className={styles.details}>
                                  {day.notes}
                                </span>{" "}
                                {/* Display notes */}
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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
          onSave={(details, country, city, locations, notes) =>
            handleSaveDetails(details, country, city, locations, notes)
          }
          onDelete={handleDeleteClick}
          currentDetails={currentCard.details}
          currentCountry={currentCard.country}
          currentCity={currentCard.city}
          currentLocations={currentCard.locations}
          currentNotes={currentCard.notes}
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
