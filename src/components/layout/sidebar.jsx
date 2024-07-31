import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="bg-gray-900">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="bg-gray-900">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" activeClassName="bg-gray-900">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-trip" activeClassName="bg-gray-900">
              Add Trip
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
