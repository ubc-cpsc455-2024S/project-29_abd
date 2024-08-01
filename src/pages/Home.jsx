import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Button } from '../components/ui/button';
import ImageCarousel from "../components/ImageCarousel";
import LoginPopup from "../components/LoginPopup";
import "./Home.css";

const Home = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="home-page">
            <ImageCarousel />
            <div className="home-content">
                <h1>Solo Explorer</h1>
                <p>Find your new adventure!</p>
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
                                Login
                            </Button>
                        </>
                    )}
                </div>
            </div>
            {showLoginPopup && (
                <LoginPopup onClose={() => setShowLoginPopup(false)} />
            )}
        </div>
    );
};

export default Home;




