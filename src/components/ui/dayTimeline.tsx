import React, { useState, useEffect, useRef } from "react";
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
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
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
    const nextId =
      dayCards.length > 0 ? Math.max(...dayCards.map((day) => day.id)) + 1 : 1;

    const newDay: DayCard = {
      id: nextId,
      title: `Day ${nextId}`,
      details: "Enter details here",
      country: "",
      city: [""],
      locations: [""],
      notes: "",
    };
    dispatch(addDayCard(newDay));
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = dayCards[dragIndex];
    const updatedCards = update(dayCards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedCard],
      ],
    });
    dispatch(reorderDayCards(updatedCards));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="day-timeline space-y-4 p-4">
        <Button onClick={handleAddNewDay} className="mb-4">
          Add Day
        </Button>
        <div className="space-y-4">
          {dayCards.map((day, index) => (
            <DayCardComponent
              key={day.id}
              index={index}
              day={day}
              moveCard={moveCard}
              handleCardClick={handleCardClick}
              handleEditClick={handleEditClick}
              expandedCards={expandedCards}
              flags={flags}
            />
          ))}
        </div>
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
    </DndProvider>
  );
};

const DayCardComponent: React.FC<{
  index: number;
  day: DayCard;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleCardClick: (id: number) => void;
  handleEditClick: (day: DayCard, e: React.MouseEvent) => void;
  expandedCards: number[];
  flags: { [key: number]: string };
}> = ({
  index,
  day,
  moveCard,
  handleCardClick,
  handleEditClick,
  expandedCards,
  flags,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "DAY_CARD",
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "DAY_CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`${styles.card} ${
        expandedCards.includes(day.id)
          ? styles.cardExpanded
          : styles.cardCollapsed
      } cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
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
        <CardContent className={styles.cardContent}>
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
              </span>
            </div>
            {expandedCards.includes(day.id) && (
              <>
                <span className={styles.details}>{day.details}</span>
                <span className={styles.location}>
                  {day.locations.join(", ")}
                </span>
                <span className={styles.details}>{day.notes}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayTimeline;
