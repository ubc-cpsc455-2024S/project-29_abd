import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Tooltip from "@radix-ui/react-tooltip";

const DayTimeline = () => {
  const [dayCards, setDayCards] = useState([
    { id: 1, title: "Day 1", details: "Details for Day 1" },
    { id: 2, title: "Day 2", details: "Details for Day 2" },
    { id: 3, title: "Day 3", details: "Details for Day 3" },
    { id: 4, title: "Day 4", details: "Details for Day 4" },
    { id: 5, title: "Day 5", details: "Details for Day 5" },
    { id: 6, title: "Day 6", details: "Details for Day 6" },
    { id: 7, title: "Day 7", details: "Details for Day 7" },
    { id: 8, title: "Day 8", details: "Details for Day 8" },
    { id: 9, title: "Day 9", details: "Details for Day 9" },
    { id: 10, title: "Day 10", details: "Details for Day 10" },
    { id: 11, title: "Day 11", details: "Details for Day 11" },
    { id: 12, title: "Day 12", details: "Details for Day 12" },
    { id: 13, title: "Day 13", details: "Details for Day 13" },
    { id: 14, title: "Day 14", details: "Details for Day 14" },
  ]);

  const handleCardClick = (id: number) => {
    // Implement the logic to handle card click
    console.log(`Card ${id} clicked`);
  };

  return (
    <div className="day-timeline space-y-4 p-4">
      {dayCards.map((day) => (
        <Card
          key={day.id}
          onClick={() => handleCardClick(day.id)}
          className="cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{day.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <span className="text-gray-700">{day.details}</span>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="secondary"
                  className="ml-4"
                  onClick={() => console.log(`Edit ${day.id}`)}
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
      ))}
    </div>
  );
};

export default DayTimeline;
