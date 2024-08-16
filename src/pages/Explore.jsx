import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const fetchPublicTrips = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_API_URL}/trips/public`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch public trips");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching public trips:", error);
        return [];
    }
};

const Explore = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getPublicTrips = async () => {
            try {
                const publicTrips = await fetchPublicTrips();
                setTrips(publicTrips);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getPublicTrips();
    }, []);

    const handleViewClick = (tripId) => {
        navigate(`/trips/${tripId}`);
    };

    if (loading) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Explore Public Trips</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Explore Public Trips</h1>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <ScrollArea className="flex flex-col h-full w-full">
            <TooltipProvider>
                <div className="App flex h-screen overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Explore Public Trips
                                </h2>
                            </div>
                            <Table>
                                <TableCaption>List of public trips</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Trip Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {trips.map((trip) => (
                                        <TableRow key={trip._id} className="hover:bg-gray-50">
                                            <TableCell className="px-4 py-2">
                                                <div className="text-sm text-gray-500">{trip.name}</div>
                                            </TableCell>
                                            <TableCell className="px-4 py-2">
                                                <div className="text-sm text-gray-500">
                                                    {trip.description}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-2">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(trip.startDate).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-2">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(trip.endDate).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-2 space-x-2">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleViewClick(trip._id)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </ScrollArea>
    );
};

export default Explore;

