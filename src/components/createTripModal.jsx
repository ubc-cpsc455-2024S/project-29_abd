import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { FaLock, FaLockOpen } from 'react-icons/fa';  // Import lock icons from react-icons
import { addTrip } from '../redux/tripSlice';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';

const CreateTripModal = ({ isOpen, onClose }) => {
    const [tripDetails, setTripDetails] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        public: false,
    });

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTripDetails(prevDetails => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTogglePublic = () => {
        setTripDetails(prevDetails => ({
            ...prevDetails,
            public: !prevDetails.public,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addTrip({ ...tripDetails, userId: user.id })).unwrap();
            onClose(); // Close the form after successful submission
        } catch (error) {
            console.error('Error creating trip:', error);
            alert(`Failed to create trip: ${error.message}`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Trip</DialogTitle>
                    <DialogDescription>Fill out the details below to create a new trip.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name">Trip Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={tripDetails.name}
                            onChange={handleChange}
                            placeholder="Trip Name"
                            className="input mb-4"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={tripDetails.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="input mb-4"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            type="date"
                            name="startDate"
                            value={tripDetails.startDate}
                            onChange={handleChange}
                            className="input mb-4"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            type="date"
                            name="endDate"
                            value={tripDetails.endDate}
                            onChange={handleChange}
                            className="input mb-4"
                            required
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Button type="button" onClick={handleTogglePublic} className="mr-2">
                            {tripDetails.public ? <FaLockOpen className="mr-2 h-4 w-4" /> : <FaLock className="mr-2 h-4 w-4" />}
                            {tripDetails.public ? 'Public' : 'Private'}
                        </Button>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTripModal;
