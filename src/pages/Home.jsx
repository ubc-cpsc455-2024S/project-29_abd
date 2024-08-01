import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
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
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                className="login-button"
                                onClick={() => setShowLoginPopup(true)}
                            >
                                Login
                            </button>
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




