import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Button } from "./button";
import * as Tooltip from "@radix-ui/react-tooltip";
import Showdown from "showdown";
import { Badge } from "./badge";
import styles from "../dayTimeline.module.css";

const converter = new Showdown.Converter();

const DayCard = ({
  day,
  index,
  flags,
  expandedCards,
  handleCardClick,
  handleEditClick,
}) => {
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  useEffect(() => {
    const countries = new Set();
    const cities = new Set();

    day.locations.forEach((location) => {
      if (location.country) {
        countries.add(location.country);
      }
      if (location.city) {
        cities.add(location.city);
      }
    });

    setUniqueCountries(Array.from(countries));
    setUniqueCities(Array.from(cities));
  }, [day.locations]);

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
          <div>
            <div className="flex items-center">
              {flags[day._id] && (
                <img
                  src={flags[day._id]}
                  alt={`${day.country} flag`}
                  className={styles.flag}
                />
              )}
              <span className={styles.location}>
                {day.country} {day.city.join(", ")}
              </span>
            </div>
            {expandedCards.includes(day._id) && (
              <>
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(day.details) }}
                />
                <span className={styles.notes}>{day.notes}</span>{" "}

                <div className="flex flex-wrap gap-2 mt-2">
                  {uniqueCountries.map((country) => (
                    <Badge key={country} variant="outline">
                      {country}
                    </Badge>
                  ))}
                  {uniqueCities.map((city) => (
                    <Badge key={city} variant="outline">
                      {city}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayCard;
