import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips, clearTrips } from '../redux/tripSlice';
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import CreateTripModal from '../components/createTripModal';
import { Button } from '../components/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';
import TripsTable from '../components/tripsTable';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { trips } = useSelector((state) => state.trip);

    const refreshTrips = useCallback(() => {
        if (user && token) {
            dispatch(clearTrips());
            dispatch(fetchTrips());
        }
    }, [user, token, dispatch]);

    useEffect(() => {
        refreshTrips();
    }, [refreshTrips]);

    // useEffect(() => {
    //     refreshTrips();
    //     console.log('Persisted state on Profile page:', { user, token, trips });
    // }, [refreshTrips, user, token, trips]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (!user) {
        return <p>Please log in to view your trips.</p>;
    }

    return (
        <ScrollArea className="flex flex-col h-full w-full">
            <TooltipProvider>
                <div className="App flex h-screen overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl font-bold tracking-tight">Your Trips</h2>
                                <Button onClick={handleOpenModal}>
                                    <Pencil2Icon className="mr-2 h-4 w-4" />Create New Trip
                                </Button>
                            </div>
                            <TripsTable trips={trips} refreshTrips={refreshTrips} />
                        </div>
                    </div>
                </div>
            </TooltipProvider>
            <CreateTripModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </ScrollArea>
    );
};

export default Profile;
    