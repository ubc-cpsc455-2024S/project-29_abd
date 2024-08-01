import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <nav className="dashboard-nav">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" activeClassName="active">
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-trip" activeClassName="active">
            Add Trip
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNav;
