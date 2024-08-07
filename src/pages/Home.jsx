import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { Button } from '../components/ui/button';
import ImageCarousel from "../components/ImageCarousel";
import LoginPopup from "../components/LoginPopup";
import RegisterPopup from "../components/RegisterPopup";
import "./Home.css";

const Home = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSuccess = () => {
        navigate('/profile');
    };

    return (
        <div className="home-page">
            <ImageCarousel />
            <div className="home-content">
                <h1>solo explorer</h1>
                <p>find your new adventure</p>
                <div className="button-container">
                    {user ? (
                        <Button className="logout-button" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button
                                className="login-button"
                                onClick={() => setShowLoginPopup(true)}
                            >
                                login
                            </Button>
                            <Button
                                className="login-button"
                                onClick={() => setShowRegisterPopup(true)}
                            >
                                sign up
                            </Button>
                        </>
                    )}
                </div>
            </div>
            {showLoginPopup && (
                <LoginPopup onClose={() => setShowLoginPopup(false)} onSuccess={handleSuccess} />
            )}
            {showRegisterPopup && (
                <RegisterPopup onClose={() => setShowRegisterPopup(false)} onSuccess={handleSuccess} />
            )}
        </div>
    );
};

export default Home;
