import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import MapWithMarkers from "../services/api/map-template";
import DayTimeline from '../components/dayTimeline';
import { fetchDayCards } from '../redux/dayTimelineSlice';

const AddTrip = () => {
    const { tripId } = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const dayCards = useSelector((state) => state.dayTimeline.dayCards);
    const allLocations = useSelector((state) => state.dayTimeline.locations);

    useEffect(() => {
        if (tripId && token) {
            dispatch(fetchDayCards({ tripId, token }));
        }
    }, [dispatch, tripId, token]);

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
                                    {Array.isArray(dayCards) && dayCards.map((day, index) => (
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
                                        <DayTimeline className="h-full" tripId={tripId} onDaysUpdated={() => dispatch(fetchDayCards({ tripId, token }))} />
                                    </div>
                                </TabsContent>
                                {Array.isArray(dayCards) && dayCards.map((day, index) => (
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
                                            <DayTimeline className="h-full" tripId={tripId} dayId={day._id} onDaysUpdated={() => dispatch(fetchDayCards({ tripId, token }))} />
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
