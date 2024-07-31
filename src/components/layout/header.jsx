import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <header className="bg-white shadow p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </header>
  );
};

export default Header;
