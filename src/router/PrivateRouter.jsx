import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const PrivateRoute = ({children, allowedUser}) => {
    const {isAuthenticated, role} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!allowedUser.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }
    // const isAuthenticated = sessionStorage.getItem('user'); // or localStorage
    // return isAuthenticated ? children : <Navigate to="/" replace />;

    return children;
};

export default PrivateRoute;
