// src/components/layout/NavBar.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css'; // Add CSS file for styling
//
// const NavBar: React.FC = () => {
//     return (
//         <nav className="navbar">
//             <ul className="navbar-list">
//                 <li className="navbar-item"><Link to="/">Home</Link></li>
//                 <li className="navbar-item"><Link to="/profile">Dashboard</Link></li>
//                 <li className="navbar-item"><Link to="/add-trip">Add New Trip</Link></li>
//                 <li className="navbar-item"><Link to="/explore">Explore</Link></li>
//             </ul>
//         </nav>
//     );
// };
//
// export default NavBar;

// src/components/layout/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Add CSS file for styling

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">Home</Link></li>
                <li className="navbar-item"><Link to="/profile">Profile</Link></li>
                <li className="navbar-item"><Link to="/add-trip">Add New Trip</Link></li>
                <li className="navbar-item"><Link to="/explore">Explore</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;

