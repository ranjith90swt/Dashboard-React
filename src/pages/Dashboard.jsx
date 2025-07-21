import React from 'react'
import Card from '../components/Card'
import ProductList from './ProductList'
import UserList from './UserList'
import DashboardChart from '../components/DashboardChart'
import { StatCard } from '../components/StatCard'
const Dashboard = () => {
  return (
    <>
      <h2 className='page-title'>Dashboard</h2>

      <div className='d-flex flex-row gap-4 mb-4'>
        <div className="w-25">
          <StatCard 
               title="Total Users"
                value={1240}
                // icon="bi-people-fill"
                color="primary"
          />
        </div>

         <div className="w-25">
            <StatCard 
               title="Total Revenue"
                value={3240}
                prefix='$'
                // icon="bi-people-fill"
                color="primary"
            />
        </div>

         <div className="w-25">
            <StatCard 
               title="Total Transactions"
                value={2245}
                // icon="bi-people-fill"
                color="primary"
            />
        </div>

         <div className="w-25">
            <StatCard 
               title="Total Amount"
                value={3045}
                // icon="bi-people-fill"
                color="primary"
            />
        </div>
       
      </div>

      <DashboardChart title='Chart' />



      <div className="d-flex flex-row gap-4">
        <div className="w-50">
          
          <UserList 
           
           title='Recent Users'
           showSearch={false}
           showPageSize={false}
           showPagination={false}
           showItemCount={false}
           limit={7}
           showCardTitle={true}
           showPageTitle={false}
          />
          
          
        </div>
        <div className="w-50">
          <UserList 
           
           title='Recent Users'
           showSearch={false}
           showPageSize={false}
           showPagination={false}
           showItemCount={false}
           limit={7}
           showCardTitle={true}
           showPageTitle={false}
          />
        </div>
      </div>
    </>

  )
}

export default Dashboard