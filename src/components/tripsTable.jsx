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
import ConfirmationModal from "./ConfirmationModal";

const fetchTrips = async (userID) => {
    try {
        //console.log(userID);
        //TODO make it show only current user's trip /trips/user/{userID}
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips`);
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

const deleteTrip = async (tripId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips/${tripId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete trip');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting trip:', error);
        throw error;
    }
};

const TripsTable = ({ userID }) => {
    const [trips, setTrips] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tripToDelete, setTripToDelete] = useState(null);
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        const getTrips = async () => {
            const tripsList = await fetchTrips(userID);
            setTrips(tripsList);
        };

        getTrips();
    }, [userID]);

    const handleViewClick = (tripId) => {
        navigate(`/trips/${tripId}`); // Navigate to AddTrip with tripId
    };

    const handleDeleteClick = (tripId) => {
        setTripToDelete(tripId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (tripToDelete) {
            try {
                await deleteTrip(tripToDelete);
                setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripToDelete));
                setIsModalOpen(false);
                setTripToDelete(null);
            } catch (error) {
                console.error('Failed to delete trip:', error);
                // Optionally show a user-friendly error message
            }
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setTripToDelete(null);
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
                        <TableRow key={trip._id} className="hover:bg-gray-50">
                            <TableCell className="px-4 py-2">
                                <div className="text-sm font-medium text-gray-900">Trip Name</div>
                                <div className="text-sm text-gray-500">{trip.name}</div>
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                <div className="text-sm font-medium text-gray-900">Description</div>
                                <div className="text-sm text-gray-500">{trip.description}</div>
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                <div className="text-sm font-medium text-gray-900">Start Date</div>
                                <div className="text-sm text-gray-500">{new Date(trip.startDate).toLocaleDateString()}</div>
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                <div className="text-sm font-medium text-gray-900">End Date</div>
                                <div className="text-sm text-gray-500">{new Date(trip.endDate).toLocaleDateString()}</div>
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                <div className="text-sm font-medium text-gray-900">Public</div>
                                <div className="text-sm text-gray-500">{trip.public ? "Yes" : "No"}</div>
                            </TableCell>
                            <TableCell className="px-4 py-2 space-x-2">
                                <Button variant="secondary" onClick={() => handleViewClick(trip._id)}>
                                    View
                                </Button>
                                <Button variant="destructive" onClick={() => handleDeleteClick(trip._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this trip?"
            />
        </div>
    );
};

export default TripsTable;
