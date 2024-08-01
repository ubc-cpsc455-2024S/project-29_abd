import React, { useState } from 'react';
import { useSelector } from "react-redux";
import TripsTable from '../components/tripsTable';
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import CreateTripModal from '../components/createTripModal';
import { Button } from '../components/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons'

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                            {
                            // TODO Uncomment when auth is working, show message if not logged in
                            //user && 
                            <TripsTable userID={user.id} />}
                        </div>
                    </div>
                </div>
            </TooltipProvider>
            <CreateTripModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </ScrollArea>
    );
};

export default Profile;
