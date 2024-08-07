import React, { useState, useEffect } from 'react';
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

const fetchPublicTrips = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips/public`);
        if (!response.ok) {
            throw new Error('Failed to fetch public trips');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching public trips:', error);
        return [];
    }
};

const Explore = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const getPublicTrips = async () => {
            const publicTrips = await fetchPublicTrips();
            setTrips(publicTrips);
        };
        getPublicTrips();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Explore Public Trips</h1>
            <Table>
                <TableCaption>List of public trips</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Trip Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trips.map((trip) => (
                        <TableRow key={trip._id} className="hover:bg-gray-50">
                            <TableCell className="px-4 py-2">{trip.name}</TableCell>
                            <TableCell className="px-4 py-2">{trip.description}</TableCell>
                            <TableCell className="px-4 py-2">{new Date(trip.startDate).toLocaleDateString()}</TableCell>
                            <TableCell className="px-4 py-2">{new Date(trip.endDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Explore;

