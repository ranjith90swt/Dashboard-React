import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/CommonDropdown.css';

const CommonDropdown = ({
  label = 'Dropdown',
  items = [],
  dropdownicon = null,
  position = '', // top-start, top-end, bottom-start, bottom-end
  buttonClass = '',
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Bootstrap-compatible dropdown positioning
  const getPositionClass = () => {
    switch (position) {
      case 'top-start':
        return 'dropdown-menu dropdown-menu-start position-absolute start-0';
      case 'top-end':
        return 'dropdown-menu dropdown-menu-end position-absolute end-0';
      case 'bottom-start':
        return 'dropdown-menu dropdown-menu-start';
      case 'bottom-end':
      default:
        return 'dropdown-menu dropdown-menu-end';
    }
  };

  return (
    <div className="common-dropdown position-relative" ref={dropdownRef}>
      <button
        type="button"
        className={`${buttonClass} dropdown-toggle`}
        onClick={() => setOpen(!open)}
      >
        {dropdownicon && <span className="me-2">{dropdownicon}</span>}
        {label}
      </button>
      {open && (
        <ul className={`${getPositionClass()} show`}>
          {items.map((item, index) => {
            if (item.type === 'link') {
              return (
                <li key={index}>
                  <Link to={item.to} className="dropdown-item">
                    {item.icon && <span className="me-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                </li>
              );
            } else if (item.type === 'external') {
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    target={item.target || '_blank'}
                    rel="noopener noreferrer"
                    className="dropdown-item"
                  >
                    {item.icon && <span className="me-2">{item.icon}</span>}
                    {item.label}
                  </a>
                </li>
              );
            } else if (item.type === 'action') {
              return (
                <li key={index}>
                  <button className="dropdown-item" onClick={item.onClick}>
                    {item.icon && <span className="me-2">{item.icon}</span>}
                    {item.label}
                  </button>
                </li>
              );
            } else if (item.type === 'divider') {
              return <li key={index}><hr className="dropdown-divider" /></li>;
            } else {
              return null;
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default CommonDropdown;
