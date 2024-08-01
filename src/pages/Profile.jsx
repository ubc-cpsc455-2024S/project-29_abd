import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import TripsTable from '../components/tripsTable';
import { ScrollArea } from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import CreateTripModal from '../components/createTripModal';
import { Button } from '../components/ui/button';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                <Button onClick={handleOpenModal}>Create New Trip</Button>
                            </div>
                            <TripsTable />
                        </div>
                    </div>
                </div>
            </TooltipProvider>
            <CreateTripModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </ScrollArea>
    );
};

export default Profile;
