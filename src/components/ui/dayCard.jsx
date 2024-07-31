import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Button } from "./button";
import * as Tooltip from "@radix-ui/react-tooltip";
import Showdown from "showdown";
import styles from "./dayTimeline.module.css";

const converter = new Showdown.Converter();

const DayCard = ({
  day,
  index,
  flags,
  expandedCards,
  handleCardClick,
  handleEditClick,
  provided,
  snapshot,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`${styles.card} ${
        snapshot.isDragging ? styles.cardDragging : ""
      } ${
        expandedCards.includes(day.id)
          ? styles.cardExpanded
          : styles.cardCollapsed
      } cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      style={{
        ...provided.draggableProps.style,
        transition: snapshot.isDragging ? "none" : "all 0.3s ease",
      }}
      onClick={() => handleCardClick(day.id)}
    >
      <Card>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>{`Day ${index + 1}`}</CardTitle>
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
            </div>
            {expandedCards.includes(day.id) && (
              <>
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(day.details) }}
                />
                <span className={styles.location}>{day.locations.join(", ")}</span>{" "}
                <span className={styles.notes}>{day.notes}</span>{" "}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayCard;
