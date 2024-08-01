import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile.jsx';
import Explore from './pages/Explore';
import AddTrip from './pages/AddTrip';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen w-screen">
                <NavBar />
                <div className="flex-1 flex overflow-hidden">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/add-trip" element={<AddTrip />} />
                        <Route path="/trips/:tripId" element={<AddTrip />} /> {/* New Route */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
