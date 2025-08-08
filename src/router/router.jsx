import React from "react";
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import UserList from "../pages/UserList";
import ProductList from "../pages/ProductList";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Loginpage from "../pages/Loginpage";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRouter";
import UnAuthorized from "../pages/UnAuthorized";
import UserDashboard from "../pages/UserDashboard";
import UserTransactions from "../pages/user/UserTransactions";
import BeneficiaryList from "../pages/user/BeneficiaryList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Loginpage />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized />,
    },
    {
        path: "/",
        element: (
            <PrivateRoute allowedUser={["admin"]}>
                {" "}
                <App />{" "}
            </PrivateRoute>
        ),
        children: [
            {
                path: "/users",
                element: <UserList />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/products",
                element: <ProductList />,
            },
            {
                path: "/transactions",
                element: <Transactions />,
            },
        ],
    },
    {
        path: "/",
        element: (
            <PrivateRoute allowedUser={["user"]}>
                {" "}
                <App />{" "}
            </PrivateRoute>
        ),
        children: [
            {
                path: "/user-dashboard",
                element: <UserDashboard />,
            },
            {
                path: "/user-transactions",
                element: <UserTransactions />,
            },
            {
                path: "/user-beneficiary",
                element: <BeneficiaryList />,
            },
        ],
    },
]);

export default router;
