// src/pages/Profile.jsx
import React from 'react';
import TripsTable from '../components/ui/tripsTable';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {ScrollArea} from "../components/ui/scroll-area";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const Profile = () => {
    return (
        <ScrollArea className="flex flex-col h-full w-full">
        <TooltipProvider>
            <div className="App flex h-screen overflow-hidden">
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="flex-1 flex flex-col p-4 md:p-8 pt-6 h-full w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold tracking-tight">Your Trips</h2>
                        </div>
                        <TripsTable></TripsTable>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    </ScrollArea>
);
};

export default Profile;
