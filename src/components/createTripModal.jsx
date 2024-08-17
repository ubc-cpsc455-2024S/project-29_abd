import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { addTrip } from '../redux/tripSlice';

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

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTripDetails(prevDetails => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value,
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Create New Trip</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        value={tripDetails.name}
                        onChange={handleChange}
                        placeholder="Trip Name"
                        className="input mb-4"
                        required
                    />
                    <Input
                        type="text"
                        name="description"
                        value={tripDetails.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="input mb-4"
                        required
                    />
                    <Label>Start Date</Label>

                    <Input
                        type="date"
                        name="startDate"
                        value={tripDetails.startDate}
                        onChange={handleChange}
                        className="input mb-4"
                        required
                    />
                    <Label>End Date</Label>

                    <Input
                        type="date"
                        name="endDate"
                        value={tripDetails.endDate}
                        onChange={handleChange}
                        className="input mb-4"
                        required
                    />
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            name="public"
                            checked={tripDetails.public}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="public" className="select-none">Public</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTripModal;


