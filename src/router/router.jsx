import React from 'react'
import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import UserList from '../pages/UserList';
import ProductList from '../pages/ProductList';
import Dashboard from '../pages/Dashboard';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
               path:'/users',
               element: <UserList />
            },
            {
               path:'/',
               element: <Dashboard />
            },
            {
               path:'/products',
               element: <ProductList />
            }
        ]
       
    }
])

export default router