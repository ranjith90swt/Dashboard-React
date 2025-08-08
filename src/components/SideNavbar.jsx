import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

import userPic from "../assets/photo.jpeg";
import {useAuth} from "../hooks/useAuth";

import {TbCash} from "react-icons/tb";
import {IoIosCash} from "react-icons/io";

const SideNavbar = ({handleLogout}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    const navItems = [
        {to: "/dashboard", label: "Dashboard", icon: "bi bi-ui-checks-grid"},
        {to: "/users", label: "User Lists", icon: "bi bi-person-lines-fill"},
        {to: "/products", label: "Products", icon: "bi bi-list-task"},
        {to: "/transactions", label: "Transactions", icon: "bi bi-cash"},
    ];

    const UserNavItems = [
        {to: "/user-dashboard", label: "Dashboard", icon: "bi bi-ui-checks-grid"},
        {to: "/user-beneficiary", label: "Beneficiary List", icon: <IoIosCash />},
        {to: "/user-transactions", label: "Transaction History", icon: <IoIosCash />},
    ];

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const data = sessionStorage.getItem("user");
        if (data) {
            setUserData(JSON.parse(data));
        }
    }, []);

    const {role} = useAuth();

    return (
        <>
            <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
                <button className="toggle-btn d-flex justify-content-end border-none" onClick={toggleSidebar}>
                    <i className={`bi ${isExpanded ? "bi-chevron-left" : "bi-chevron-right"}`}></i>
                </button>
                <h2 className="logo">T{isExpanded && "heme"}</h2>

                <div className=" py-3">
                    {role === "admin" && (
                        <>
                            <NavLink to="/dashboard" className="d-flex align-items-center">
                                <div className="user-icon">
                                    {/* Js */}
                                    <img src={userPic} className="img-fluid userImg" alt="" />
                                    <span className="user-active"></span>
                                </div>
                                {isExpanded && (
                                    <div className="ps-2">
                                        <h6 className="mt-0 mb-0 user-name">
                                            {" "}
                                            {isExpanded && ""} {userData.name}
                                        </h6>
                                        <span className="user-role">{isExpanded && role}</span>
                                    </div>
                                )}
                            </NavLink>
                        </>
                    )}

                    {role === "user" && (
                        <>
                            <NavLink to="/user-dashboard" className="d-flex align-items-center">
                                <div className="user-icon">
                                    {/* Js */}
                                    <img src={userPic} className="img-fluid userImg" alt="" />
                                    <span className="user-active"></span>
                                </div>
                                {isExpanded && (
                                    <div className="ps-2">
                                        <h6 className="mt-0 mb-0 user-name">
                                            {" "}
                                            {isExpanded && ""} {userData.name}
                                        </h6>
                                        <span className="user-role">{isExpanded && role}</span>
                                    </div>
                                )}
                            </NavLink>
                        </>
                    )}
                </div>

                {isExpanded && <h6 className="page-subtitle mb-3 mt-3">Pages</h6>}

                <ul className="nav flex-column">
                    {role === "admin" &&
                        navItems.map(({to, label, icon}, index) => (
                            <li key={index}>
                                <NavLink
                                    to={to}
                                    className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                                >
                                    <i className={`${icon} me-2`}></i> {isExpanded && label}
                                </NavLink>
                            </li>
                        ))}

                    {role === "user" &&
                        UserNavItems.map(({to, label, icon}, index) => (
                            <li key={index}>
                                <NavLink
                                    to={to}
                                    className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                                >
                                    {typeof icon === "string" ? (
                                        <i className={`${icon} me-2`}></i>
                                    ) : (
                                        <span className="me-2">{icon}</span>
                                    )}
                                    {isExpanded && label}
                                </NavLink>
                            </li>
                        ))}
                </ul>
                <div className="logout">
                    <div className="d-flex align-items-center">
                        <div className="user-icon">
                            <img src={userPic} alt="" className="userImg img-fluid circle" />
                            {/* Js */}
                        </div>
                        {isExpanded && (
                            <div className="ps-2">
                                <h6 className="mt-0 mb-0 user-name"> {userData?.userName || ""} </h6>
                                <span className="user-role">{isExpanded && "Admin"}</span>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-primary mb-2 mt-3" onClick={handleLogout}>
                        <i class="bi bi-box-arrow-right"></i> {isExpanded && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideNavbar;
