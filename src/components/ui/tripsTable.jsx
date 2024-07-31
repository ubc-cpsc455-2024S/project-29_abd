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

const fetchTrips = async () => {
    try {
        const userID = "66a58ee1b47d270c9f82ea6e";
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips/user/${userID}`);
        if (!response.ok) {
            console.error("Error fetching trips:", response);
            throw new Error("Failed to fetch trips");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching trips:", error);
        return [];
    }
};

const TripsTable = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        const getTrips = async () => {
            const tripsList = await fetchTrips();
            setTrips(tripsList);
        };

        getTrips();
    }, []);

    const handleViewClick = (tripId) => {
        navigate(`/trips/${tripId}`); // Navigate to AddTrip with tripId
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Current Trips</h1>
            <Table>
                <TableCaption>List of your current trips</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Trip Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Public</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trips.map((trip) => (
                        <TableRow key={trip._id}>
                            <TableCell>{trip.name}</TableCell>
                            <TableCell>{trip.description}</TableCell>
                            <TableCell>{new Date(trip.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(trip.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{trip.public ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <Button variant="secondary" onClick={() => handleViewClick(trip._id)}>
                                    View
                                </Button>
                                <Button variant="destructive" onClick={() => console.log(`Deleting trip ${trip._id}`)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TripsTable;
