import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import AddTrip from './pages/AddTrip';
import { setUser } from './redux/authSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token && user) {
                const parsedUser = JSON.parse(user);
                dispatch(setUser({ user: parsedUser, token }));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [dispatch]);

    return (
        <Router>
            <div className="flex flex-col h-screen w-screen">
                <NavBar />
                <div className="flex-1 flex overflow-hidden">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/trips/:tripId" element={<AddTrip />} /> {/* Add this route */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
