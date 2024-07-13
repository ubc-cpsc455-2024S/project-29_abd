import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { DayCard, addDayCard, reorderDayCards } from "@/redux/dayTimelineSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styles from "./dayTimeline.module.css";
import DayCardComponent from "./DayCardComponent";

const fetchCountryFlag = async (country: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  if (!response.ok) {
    console.error(`Failed to fetch flag for country: ${country}`);
    return "";
  }
  const data = await response.json();
  return data[0]?.flags?.svg || "";
};

const DayTimeline: React.FC = () => {
  const dispatch = useDispatch();
  const dayCards = useSelector(
    (state: RootState) => state.dayTimeline.dayCards
  );
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

  const handleAddNewDay = () => {
    const newId = dayCards.length
      ? Math.max(...dayCards.map((day) => day.id)) + 1
      : 1;
    const newDay: DayCard = {
      id: newId,
      title: `Day ${dayCards.length + 1}`,
      details: "",
      country: "",
      city: [""],
      locations: [""],
      notes: "",
    };
    dispatch(addDayCard(newDay));
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = dayCards[dragIndex];
      const newCards = [...dayCards];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(reorderDayCards(newCards));
    },
    [dayCards, dispatch]
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    moveCard(result.source.index, result.destination.index);
  };

  return (
    <div className="day-timeline space-y-4 p-4">
      <Button onClick={handleAddNewDay} className="mb-4">
        Add Day
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        {dayCards.map((day, index) => (
          <Droppable key={day.id} droppableId={day.id.toString()}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                <Draggable
                  key={day.id}
                  draggableId={day.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`draggable-${day.id}`}
                    >
                      <DayCardComponent
                        index={index}
                        day={day}
                        moveCard={moveCard}
                        handleCardClick={handleCardClick}
                        expandedCards={expandedCards}
                        flags={flags}
                      />
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default DayTimeline;
