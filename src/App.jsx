import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import AddTrip from './pages/AddTrip';
import { setUser } from './redux/authSlice';
import { store } from './redux/store';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            dispatch(setUser({ user, token }));
        }

        console.log('Persisted state:', store.getState());
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
                        <Route path="/trips/:tripId" element={<AddTrip />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

