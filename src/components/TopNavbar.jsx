import React, { useEffect, useState } from 'react';
import '../css/TopNavbar.css';
import CommonDropdown from './CommonDropdown';
import { FaUser, FaCog, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import { SlUser } from 'react-icons/sl';


const TopNavbar = ({handleLogout}) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

const dropdownItems = [ 
  { type: 'link', to: '/profile', label: 'Profile', icon: <FaUser /> },
  { type: 'link', to: '/settings', label: 'Settings', icon: <FaCog /> },
  { type: 'external', href: 'https://example.com', label: 'Website', icon: <FaGlobe /> },
  { type: 'divider' },
  { type: 'action', label: 'Logout', onClick: handleLogout, icon: <FaSignOutAlt /> },
];



  return (
    <div className="top-navbar sticky-top d-flex justify-content-end">
      <div className="px-2">
        <CommonDropdown 
        label="" 
        items={dropdownItems} 
        buttonClass = 'btn' 
        position="top-end"
        dropdownicon= {<SlUser />}
        />
      </div>

      <button className="mode-btn" onClick={toggleTheme}>
        <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
        {/* {theme === 'light' ? 'Dark' : 'Light'}  */}
      </button>
    </div>
  );
};

export default TopNavbar;
