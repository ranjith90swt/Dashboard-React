import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import userPic from '../assets/photo.jpeg'

const SideNavbar = () => {

  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: 'bi bi-ui-checks-grid' },
    { to: '/users', label: 'User Lists', icon: 'bi bi-person-lines-fill' },
    { to: '/products', label: 'Products', icon: 'bi bi-list-task' },
    { to: '/transactions', label: 'Transactions', icon: 'bi bi-cash' },

     
   
   
  ];

   const handleLogout = () => {
    
    navigate('/');
  };

  return (
    <>
      <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button className="toggle-btn d-flex justify-content-end border-none" onClick={toggleSidebar}>
          <i className={`bi ${isExpanded ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
        </button>
        <h2 className='logo'>T{isExpanded && 'heme'}</h2>

        <NavLink to='/dashboard'>

       

        <div className="d-flex align-items-center py-3">
          <div className="user-icon">
            {/* Js */}
            <img src={userPic} className='img-fluid userImg' alt="" />
            <span className='user-active'></span>
          </div>
          {isExpanded && (
            <div className='ps-2'>
              <h6 className='mt-0 mb-0 user-name'> {isExpanded && 'Jeven Smith'} </h6>
              <span className='user-role'>{isExpanded && 'Admin'}</span>
            </div>
          )}
        </div>

         </NavLink>
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
        <div className="logout">
          <div className="d-flex align-items-center">
            <div className="user-icon">
              <img src={userPic} alt="" className='userImg img-fluid circle'/>
              {/* Js */}
            </div>
            {isExpanded && (
              <div className='ps-2'>
                <h6 className='mt-0 mb-0 user-name'> {isExpanded && 'Jeven Smith'} </h6>
                <span className='user-role'>{isExpanded && 'Admin'}</span>
              </div>
            )}
          </div>
          <button className='btn btn-primary mb-2 mt-3' onClick={handleLogout}><i class="bi bi-box-arrow-right"></i> {isExpanded && ( <span>Logout</span>  )}</button>

        </div>
      </div>
    </>
  )
}

export default SideNavbar