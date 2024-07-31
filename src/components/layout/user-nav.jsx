import React from "react";
import { Link } from "react-router-dom";

const UserNav = ({ user }) => {
  return (
    <nav className="flex items-center space-x-4">
      <Link to="/profile" className="text-gray-700 hover:text-gray-900">
        {user.name}
      </Link>
      <Link to="/settings" className="text-gray-700 hover:text-gray-900">
        Settings
      </Link>
      <Link to="/logout" className="text-gray-700 hover:text-gray-900">
        Logout
      </Link>
    </nav>
  );
};

export default UserNav;
