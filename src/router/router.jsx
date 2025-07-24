import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserList from '../pages/UserList';
import ProductList from '../pages/ProductList';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions'
import Loginpage from '../pages/Loginpage';


const router = createBrowserRouter([
   {
      path: '/',
      element: <Loginpage />
   },
   {
      path: "/",
      element: <App />,
      children: [

         {
            path: '/users',
            element: <UserList />
         },
         {
            path: '/dashboard',
            element: <Dashboard />
         },
         {
            path: '/products',
            element: <ProductList />
         },
         {
            path: '/transactions',
            element: <Transactions />
         }
      ]

   }
])

export default router