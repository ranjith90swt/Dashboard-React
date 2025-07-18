import React, { useEffect, useState } from 'react';

const TopNavbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };


  return (
    <div className="top-navbar d-flex justify-content-end">
      <button className="mode-btn" onClick={toggleTheme}>
        <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
        {/* {theme === 'light' ? 'Dark' : 'Light'}  */}
      </button>
    </div>
  );
};

export default TopNavbar;
