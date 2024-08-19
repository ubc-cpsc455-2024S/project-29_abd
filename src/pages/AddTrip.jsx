import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import MapWithMarkers from "../services/api/map-template";
import DayTimeline from "../components/dayTimeline";
import { fetchDayCards, clearDayCards } from "../redux/dayTimelineSlice";
import { Button } from "../components/ui/button";

const AddTrip = () => {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const dayCards = useSelector((state) => state.dayTimeline.dayCards);
  const [allLocations, setAllLocations] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // Track the active tab
  const printRef = useRef(); // Reference for the day cards section
  const dayTimelineRef = useRef(); // Ref to DayTimeline

  useEffect(() => {
    if (tripId && token) {
      // Clear dayCards and allLocations when tripId changes
      setAllLocations([]);
      dispatch(clearDayCards()); // Clear the existing day cards
      dispatch(fetchDayCards({ tripId, token }));
    }
  }, [dispatch, tripId, token]);

  useEffect(() => {
    if (dayCards.length > 0) {
      const locations = dayCards.reduce((acc, day) => {
        return [...acc, ...day.locations];
      }, []);
      setAllLocations(locations);
    } else {
      setAllLocations([]); // Ensure locations are cleared if there are no dayCards
    }
  }, [dayCards]);

  const handlePrint = () => {
    if (dayTimelineRef.current) {
      dayTimelineRef.current.expandAll(); // Trigger expand all before printing
    }

    setTimeout(() => {
      const printContent = document.querySelector('.day-timeline'); // Select the specific element you want to print
      if (!printContent) return; // If the element doesn't exist, exit the function

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.open();

      // Collect all stylesheets and inline styles
      const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
          .map(stylesheet => stylesheet.outerHTML)
          .join('\n');

      // Add HTML structure and content
      printWindow.document.write(`
      <html>
        <head>
          <title>Print Day Timeline</title>
          ${stylesheets}
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

      printWindow.document.close(); // Close the document to finish loading
      printWindow.focus(); // Focus the new window

      printWindow.onload = function () {
        printWindow.print(); // Trigger the print dialog
        printWindow.close(); // Close the print window after printing
      };
    }, 500); // Add a 500ms delay before printing
  };

  return (
      <ScrollArea className="flex flex-col h-full w-full">
        <TooltipProvider>
          <div className="App flex h-screen overflow-hidden">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Plan Your Trip
                  </h2>
                  <Button
                      onClick={handlePrint}
                      className="mb-4"
                      disabled={activeTab !== "overview"} // Disable if not on overview
                      style={{
                        backgroundColor:
                            activeTab !== "overview" ? "grey" : "", // Grey out the button
                        cursor: activeTab !== "overview" ? "not-allowed" : "pointer",
                      }}
                  >
                    Share Trip
                  </Button>
                </div>
                <Tabs
                    defaultValue="overview"
                    className="flex-1 flex flex-col h-full"
                    onValueChange={(value) => setActiveTab(value)} // Track active tab
                >
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {dayCards.map((day, index) => (
                        <TabsTrigger key={day._id} value={`day-${index + 1}`}>
                          Day {index + 1}
                        </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="overview" className="flex-1 flex h-full">
                    <div className="w-full md:w-2/3 flex flex-col h-full pr-4">
                      <Card className="flex-1 flex flex-col h-full">
                        <CardHeader>
                          <CardTitle>Overview Map</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <MapWithMarkers locations={allLocations} />
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-full md:w-1/3 h-full">
                      <div ref={printRef}>
                        <DayTimeline
                            className="h-full"
                            tripId={tripId}
                            ref={dayTimelineRef} // Pass the ref to DayTimeline
                            onDaysUpdated={() =>
                                dispatch(fetchDayCards({ tripId, token }))
                            }
                        />
                      </div>
                    </div>
                  </TabsContent>
                  {dayCards.map((day, index) => (
                      <TabsContent
                          key={day._id}
                          value={`day-${index + 1}`}
                          className="flex-1 flex h-full"
                      >
                        <div className="w-full md:w-2/3 flex flex-col h-full pr-4">
                          <Card className="flex-1 flex flex-col h-full">
                            <CardHeader>
                              <CardTitle>Day {index + 1} Map</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                              <MapWithMarkers locations={day.locations} />
                            </CardContent>
                          </Card>
                        </div>
                        <div className="w-full md:w-1/3 h-full">
                          <DayTimeline
                              className="h-full"
                              tripId={tripId}
                              dayId={day._id}
                              onDaysUpdated={() =>
                                  dispatch(fetchDayCards({ tripId, token }))
                              }
                          />
                        </div>
                      </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </ScrollArea>
  );
};

export default AddTrip;

