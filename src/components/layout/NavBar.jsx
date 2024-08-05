import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigaion-menu';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Solo Explorer</Link>
      </div>
      <NavigationMenu>
          <NavigationMenuLink asChild>
            <Link to="/" className={navigationMenuTriggerStyle()}>Home</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/profile" className={navigationMenuTriggerStyle()}>Profile</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/add-trip" className={navigationMenuTriggerStyle()}>Add New Trip</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/explore" className={navigationMenuTriggerStyle()}>Explore</Link>
          </NavigationMenuLink>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;
