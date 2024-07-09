import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { DayCard, addDayCard, reorderDayCards } from "@/redux/dayTimelineSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./dayTimeline.module.css";
import DayCardComponent from "./DayCardComponent";

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
    const newDay: DayCard = {
      id: dayCards.length + 1,
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

  return (
    <div className="day-timeline space-y-4 p-4">
      <Button onClick={handleAddNewDay} className="mb-4">
        Add Day
      </Button>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {dayCards.map((day, index) => (
                <Draggable key={day.id} draggableId={`${day.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DayTimeline;
