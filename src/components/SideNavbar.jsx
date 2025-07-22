import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const SideNavbar = () => {

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: 'bi bi-ui-checks-grid' },
    { to: '/users', label: 'User Lists', icon: 'bi bi-person-lines-fill' },
    { to: '/products', label: 'Products', icon: 'bi bi-list-task' },
    { to: '/transactions', label: 'Transactions', icon: 'bi bi-cash' }
  ];


  return (
    <>
      <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button className="toggle-btn d-flex justify-content-end border-none" onClick={toggleSidebar}>
          <i className={`bi ${isExpanded ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
        </button>
        <h2 className='logo'>T{isExpanded && 'heme'}</h2>

        <div className="d-flex align-items-center">
          <div className="user-icon">
            Js
          </div>
          {isExpanded && (
            <div className='ps-2'>
              <h6 className='mt-0 mb-0 user-name'> {isExpanded && 'Jeven Smith'} </h6>
              <span className='user-role'>{isExpanded && 'Admin'}</span>
            </div>
          )}
        </div>
       { 
        isExpanded && (
         <h6 className='page-subtitle mb-3 mt-3'>Pages</h6>
        )
       }

        <ul className="nav flex-column">
          {navItems.map(({ to, label, icon }, index) => (
            <li key={index}>
              <NavLink 
                to={to} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                <i className={`${icon} me-2`}></i> {isExpanded && label}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    </>
  )
}

export default SideNavbar