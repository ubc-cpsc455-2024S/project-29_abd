import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import { clearTrips } from "../redux/tripSlice";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { Button } from "./ui/button";

const RegisterPopup = ({ onClose, openLoginPopup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate to get the navigate function
    const { loading, error, user } = useSelector((state) => state.auth); // Added user from state
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email, password }));
    };

    useEffect(() => {
        if (user && user.id) { // Corrected user check
            setRegisterSuccess(true);
            setTimeout(() => {
                dispatch(clearTrips());
                setRegisterSuccess(false);
                onClose();
                navigate('/profile');
                if (typeof openLoginPopup === 'function') {
                    openLoginPopup(); 
                }
            }, 2000); // Close the popup and navigate after 2 seconds
        }
    }, [user, onClose, navigate, dispatch, openLoginPopup]); 

    useEffect(() => {
        if (!loading && !error && registerSuccess) {
            setRegisterSuccess(true);
        }
    }, [loading, error, registerSuccess]);

    useEffect(() => {
        // Clear input fields and success message on close
        if (!registerSuccess) {
            setEmail("");
            setPassword("");
        }
    }, [registerSuccess]);

    return (
        <div className="register-popup fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
            <div className="register-popup-content bg-white p-6 rounded shadow-lg relative">
                <Button className="close-button absolute top-2 right-2" onClick={onClose}>
                    &times;
                </Button>
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                <Form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                        {loading ? "Registering..." : "Register"}
                    </Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {registerSuccess && <p className="text-green-500 mt-2">Registration successful! Redirecting...</p>}
                </Form>
            </div>
        </div>
    );
};

export default RegisterPopup;
