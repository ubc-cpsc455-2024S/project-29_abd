import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/store.ts";
import { Card, CardHeader, CardTitle, CardContent } from "src/components/ui/card.tsx";
import { Button } from "src/components/ui/button.tsx";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  DayCard,
  updateDayCard,
  deleteDayCard,
  reorderDayCards,
  addDayCard,
} from "src/redux/dayTimelineSlice.ts";
import Modal from "src/components/Modal.tsx";
import ConfirmationModal from "src/components/ConfirmationModal.tsx";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styles from "./dayTimeline.module.css";

const fetchCountryFlag = async (country: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const data = await response.json();
  return data[0]?.flags?.svg || "";
};

const DayTimeline: React.FC = () => {
  const dispatch = useDispatch();
  const dayCards = useSelector(
    (state: RootState) => state.dayTimeline.dayCards
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<DayCard | null>(null);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [flags, setFlags] = useState<{ [key: number]: string }>({});

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

  const handleCardClick = (id: number) => {
    setExpandedCards((prevState) =>
      prevState.includes(id)
        ? prevState.filter((cardId) => cardId !== id)
        : [...prevState, id]
    );
  };

  const handleEditClick = (day: DayCard, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click handler from being triggered
    setCurrentCard(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCard(null);
  };

  const handleSaveDetails = (
    details: string,
    country: string,
    city: string[],
    locations: string[],
    notes: string
  ) => {
    if (currentCard) {
      const updatedDay = {
        ...currentCard,
        details,
        country,
        city,
        locations,
        notes,
      };
      dispatch(updateDayCard(updatedDay));
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentCard) {
      dispatch(deleteDayCard(currentCard.id));
      setIsModalOpen(false);
      setIsConfirmationModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleAddNewDay = () => {
    const newDay: DayCard = {
      id: Date.now(), // Use timestamp as unique ID
      title: "New Day", // Generic title
      details: "Enter details here", // Generic details
      country: "",
      city: [""],
      locations: [""],
      notes: "",
    };
    dispatch(addDayCard(newDay));
  };

  const onDragEnd = (result: DropResult) => {
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
              {dayCards.map((day: DayCard, index: number) => (
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
