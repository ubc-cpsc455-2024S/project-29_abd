// // src/pages/Dashboard.jsx
// import React from 'react';
//
// const Dashboard = () => {
//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <p>Welcome to the Profile page!</p>
//         </div>
//     );
// };
//
// export default Dashboard;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const trips = useSelector((state) => state.trip.trips); // Assume trips are in state.trip.trips

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="trips-container">
                {trips.map((trip) => (
                    <div key={trip.id} className="trip-card">
                        <h2>{trip.title}</h2>
                    </div>
                ))}
            </div>
            <Link to="/add-trip">
                <button className="add-trip-button">Add New Trip</button>
            </Link>
        </div>
    );
};

export default Dashboard;

