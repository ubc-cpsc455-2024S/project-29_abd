import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  DayCard,
  updateDayCard,
  deleteDayCard,
  reorderDayCards,
  addDayCard,
} from "@/redux/dayTimelineSlice";
import Modal from "@/components/Modal";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styles from "./dayTimeline.module.css";

const DayTimeline: React.FC = () => {
  const dispatch = useDispatch();
  const dayCards = useSelector(
    (state: RootState) => state.dayTimeline.dayCards
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<DayCard | null>(null);

  const handleCardClick = (id: number) => {
    const selectedCard = dayCards.find((card) => card.id === id);
    if (selectedCard) {
      setCurrentCard(selectedCard);
      setIsModalOpen(true);
    }
  };

  const handleEditClick = (day: DayCard) => {
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
                      } cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                      style={{
                        ...provided.draggableProps.style,
                        transition: snapshot.isDragging
                          ? "none"
                          : "all 0.3s ease",
                      }}
                    >
                      <Card onClick={() => handleCardClick(day.id)}>
                        <CardHeader
                          className={styles.cardHeader}
                          {...provided.dragHandleProps}
                        >
                          <CardTitle className={styles.cardTitle}>{`Day ${
                            index + 1
                          }`}</CardTitle>
                        </CardHeader>
                        <CardContent className={styles.cardContent}>
                          <div>
                            <span className={styles.location}>
                              {day.country}
                            </span>{" "}
                            {/* Display country */}
                            <span className={styles.location}>
                              {day.city.join(", ")}
                            </span>{" "}
                            {/* Display cities */}
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
                          </div>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <Button
                                variant="secondary"
                                className={styles.button}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(day);
                                }}
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
