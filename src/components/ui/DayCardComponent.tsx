import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DayCard, updateDayCard } from "@/redux/dayTimelineSlice";
import { useDispatch } from "react-redux";
import styles from "./dayTimeline.module.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

interface DayCardProps {
  index: number;
  day: DayCard;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleCardClick: (id: number) => void;
  expandedCards: number[];
  flags: { [key: number]: string };
}

const DayCardComponent: React.FC<DayCardProps> = ({
  index,
  day,
  moveCard,
  handleCardClick,
  expandedCards,
  flags,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDay, setEditedDay] = useState(day);
  const [locations, setLocations] = useState(day.locations);

  const [{ isDragging }, drag] = useDrag({
    type: "DAY_CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "DAY_CARD",
    hover(item: { index: number }) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const isExpanded = expandedCards.includes(day.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateDayCard({ ...editedDay, locations }));
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedDay({ ...editedDay, [name]: value });
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocations([...locations, ""]);
  };

  const handleRemoveLocation = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleLocationChange = (index: number, value: string) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`${styles.card} ${
        isExpanded ? styles.cardExpanded : styles.cardCollapsed
      } cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      onClick={() => handleCardClick(day.id)}
    >
      <Card>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>{`Day ${
            index + 1
          }`}</CardTitle>
          <div className={styles.cardInfo}>
            {flags[day.id] && (
              <img
                src={flags[day.id]}
                alt={`${day.country} flag`}
                className={styles.flag}
              />
            )}
            <span className={styles.location}>{day.city.join(", ")}</span>
          </div>
          {isExpanded && (
            <div className={styles.buttonContainer}>
              <Button
                variant="secondary"
                className={`${styles.button} ${styles.smallButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          )}
        </CardHeader>
        {isExpanded && (
          <CardContent className={styles.cardContent}>
            <div className={styles.expandedContent}>
              {isEditing ? (
                <>
                  <label className={styles.label}>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={editedDay.country}
                    onChange={handleChange}
                    className={styles.input}
                    onClick={handleInputClick}
                  />
                  <label className={styles.label}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={editedDay.city.join(", ")}
                    onChange={(e) => handleLocationChange(0, e.target.value)}
                    className={styles.input}
                    onClick={handleInputClick}
                  />
                  <label className={styles.label}>Details</label>
                  <textarea
                    name="details"
                    value={editedDay.details}
                    onChange={handleChange}
                    className={styles.textarea}
                    onClick={handleInputClick}
                  />
                  <label className={styles.label}>Notes</label>
                  <textarea
                    name="notes"
                    value={editedDay.notes}
                    onChange={handleChange}
                    className={styles.textarea}
                    onClick={handleInputClick}
                  />
                  <label className={styles.label}>Locations</label>
                  {locations.map((location, idx) => (
                    <div className={styles.locationInputContainer} key={idx}>
                      <GooglePlacesAutocomplete
                        apiKey="YOUR_GOOGLE_PLACES_API_KEY"
                        selectProps={{
                          value: location,
                          onChange: (val) =>
                            handleLocationChange(idx, val.value),
                        }}
                        className={styles.locationInput}
                        onClick={handleInputClick}
                      />
                      <Button
                        variant="secondary"
                        className={styles.removeLocationButton}
                        onClick={(e) => handleRemoveLocation(idx, e)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    className={styles.addLocationButton}
                    onClick={handleAddLocation}
                  >
                    Add Location
                  </Button>
                  <Button
                    variant="primary"
                    className={styles.saveButton}
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                </>
              ) : (
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
        )}
      </Card>
    </div>
  );
};

export default DayCardComponent;
