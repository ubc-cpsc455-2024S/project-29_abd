import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Button } from "./button";
import * as Tooltip from "@radix-ui/react-tooltip";
import Showdown from "showdown";
import styles from "../dayTimeline.module.css";

const converter = new Showdown.Converter();

const DayCard = ({
                   day,
                   index,
                   expandedCards,
                   handleCardClick,
                   handleEditClick,
                 }) => {
  return (
      <div
          className={`${expandedCards.includes(day._id)
              ? styles.cardExpanded
              : styles.cardCollapsed
          } cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}

          onClick={() => handleCardClick(day._id)}
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
              className={`${styles.cardContent} ${expandedCards.includes(day._id)
                  ? styles.cardContentVisible
                  : styles.cardContentHidden
              }`}
          >
            {expandedCards.includes(day._id) && (
                <>
                  <div
                      className="markdown-content"
                      dangerouslySetInnerHTML={{ __html: converter.makeHtml(day.details) }}
                  />
                  <span className={styles.notes}>{day.notes}</span>
                </>
            )}
          </CardContent>
        </Card>
      </div>
  );
};

export default DayCard;
