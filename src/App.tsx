import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import MapWithMarkers from "@/components/map-template";
import { MapLocation } from "@/types";
import DayTimeline from "@/components/ui/dayTimeline";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const sampleLocations: MapLocation[] = [
  { id: "1", lat: 49.2827, lng: -123.1207 }, // Vancouver
  { id: "2", lat: 49.25, lng: -123.1 },
  { id: "3", lat: 49.2606, lng: -123.246 },
  { id: "4", lat: 49.231, lng: -123.107 },
];

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ScrollArea className="flex flex-col h-full w-full">
        <TooltipProvider>
          <div className="App flex h-screen overflow-hidden">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Plan Your Trip
                  </h2>
                  <DatePickerWithRange />
                </div>
                <Tabs defaultValue="view-1" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="view-1">View 1</TabsTrigger>
                    <TabsTrigger value="view-2" disabled>
                      View 2
                    </TabsTrigger>
                    <TabsTrigger value="view-3" disabled>
                      View 3
                    </TabsTrigger>
                    <TabsTrigger value="view-4" disabled>
                      View 4
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="view-1" className="space-y-2">
                    <div className="flex flex-wrap -mx-4">
                      <div className="w-full md:w-2/3 px-4">
                        <Card className="flex flex-1 flex-col">
                          <CardHeader>
                            <CardTitle>Map View</CardTitle>
                          </CardHeader>
                          <CardContent className="pl-2">
                            <MapWithMarkers locations={sampleLocations} />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="w-1/2 p-4 md:p-8 border-l overflow-y-auto">
              <DayTimeline />
            </div>
          </div>
        </TooltipProvider>
      </ScrollArea>
    </DndProvider>
  );
}

export default App;
