import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const SideNavbar = () => {

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };


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
    
        <ul className='list-unstlyed mt-2'>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> <i class="bi bi-ui-checks-grid me-2"></i>  {isExpanded && 'Dashboard'}
            </NavLink>
          </li>
          {/* <li><NavLink to="" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> <i class="bi bi-speedometer2 me-2"></i>  {isExpanded && 'Transactions'}</NavLink></li>
          <li><NavLink to="" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> <i class="bi bi-speedometer2 me-2"></i>  {isExpanded && 'Category'}</NavLink></li>
           */}
          <li><NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> <i class="bi bi-person-lines-fill me-2"></i>  {isExpanded && 'User Lists'}</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> <i class="bi bi-list-task me-2"></i>  {isExpanded && 'Products'}</NavLink></li>
          <li><NavLink to="/transactions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> <i class="bi bi-cash me-2"></i>  {isExpanded && 'Transactions'}</NavLink></li>

        </ul>
      </div>
    </>
  )
}

export default SideNavbar