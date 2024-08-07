import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './LoginPopup.css';

const LoginPopup = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { user, loading, error, successMessage } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (user && user._id) {
            setLoginSuccess(true);
            setTimeout(() => {
                setLoginSuccess(false);
                onClose();
                navigate('/profile');
            }, 2000); // Close the popup after 2 seconds
        }
    }, [user, onClose, navigate]);

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogOverlay className="login-popup" />
            <DialogContent className="login-popup-content">
                <DialogTitle className="text-2xl font-bold mb-4 text-center">Login</DialogTitle>
                <DialogDescription className="text-center mb-4">Enter your credentials to login</DialogDescription>
                <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    {loginSuccess && <p className="success">Login successful!</p>}
                </Form>
                <DialogClose asChild>
                    <button className="close-button absolute top-2 right-2">
                        <Cross2Icon /> <span className="sr-only">Close</span>
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default LoginPopup;
