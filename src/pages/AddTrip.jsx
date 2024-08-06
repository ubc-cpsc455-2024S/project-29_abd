import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import MapWithMarkers from "../components/map-template";
import DayTimeline from '../components/dayTimeline';
import { fetchDayCards } from '../redux/dayTimelineSlice';

// Sample locations array
const sampleLocations = [
    { id: "1", lat: 49.2827, lng: -123.1207 }, // Vancouver
    { id: "2", lat: 49.25, lng: -123.1 },
    { id: "3", lat: 49.2606, lng: -123.246 },
    { id: "4", lat: 49.231, lng: -123.107 },
];

const AddTrip = () => {

    const { tripId } = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

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
                            <Tabs defaultValue="view-1" className="flex-1 flex flex-col h-full">
                                <TabsList>
                                    <TabsTrigger value="view-1">View 1</TabsTrigger>
                                    <TabsTrigger value="view-2" disabled>View 2</TabsTrigger>
                                    <TabsTrigger value="view-3" disabled>View 3</TabsTrigger>
                                    <TabsTrigger value="view-4" disabled>View 4</TabsTrigger>
                                </TabsList>
                                <TabsContent value="view-1" className="flex-1 flex h-full">
                                    <div className="w-full md:w-2/3 flex flex-col h-full pr-4">
                                        <Card className="flex-1 flex flex-col h-full">
                                            <CardHeader>
                                                <CardTitle>Map View</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-1">
                                                <MapWithMarkers locations={sampleLocations} />
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="w-full md:w-1/3 h-full">
                                        <DayTimeline className="h-full" tripId={tripId}/>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </ScrollArea>
    );
};

export default AddTrip;
