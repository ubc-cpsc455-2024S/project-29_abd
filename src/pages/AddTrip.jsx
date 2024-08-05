import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import MapWithMarkers from "../components/map-template";
import DayTimeline from "../components/dayTimeline";
import { useParams } from 'react-router-dom';

const AddTrip = () => {
    const { tripId } = useParams();
    const [days, setDays] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    const fetchTripData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips/${tripId}`);
            const data = await response.json();
            
            setDays(data.days);

            const locations = data.days.reduce((acc, day) => {
                return [...acc, ...day.locations];
            }, []);
            
            setAllLocations(locations);

        } catch (error) {
            console.error("Error fetching trip data:", error);
        }
    };

    useEffect(() => {
        fetchTripData();
    }, [tripId]);

    return (
        <ScrollArea className="flex flex-col h-full w-full">
            <TooltipProvider>
                <div className="App flex h-screen overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl font-bold tracking-tight">Plan Your Trip</h2>
                            </div>
                            <Tabs defaultValue="overview" className="flex-1 flex flex-col h-full">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    {days.map((day, index) => (
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
                                        <DayTimeline className="h-full" tripId={tripId} onDaysUpdated={fetchTripData} />
                                    </div>
                                </TabsContent>
                                {days.map((day, index) => (
                                    <TabsContent key={day._id} value={`day-${index + 1}`} className="flex-1 flex h-full">
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
                                            <DayTimeline className="h-full" tripId={tripId} dayId={day._id} onDaysUpdated={fetchTripData} />
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
