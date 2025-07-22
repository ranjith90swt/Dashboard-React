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

      <div className='row g-3 mb-4'>
        <div className="col-md-6 col-lg-3 col-sm-6">
          <StatCard 
               title="Total Users"
                value={1240}
                // icon="bi-people-fill"
                color="primary"
                bgclass='stat-bg1'
          />
        </div>

         <div className="col-md-6 col-lg-3 col-sm-6">
            <StatCard 
               title="Total Revenue"
                value={3240}
                prefix='$'
                // icon="bi-people-fill"
                color="primary"
                bgclass='stat-bg2'
            />
        </div>

         <div className="col-md-6 col-lg-3 col-sm-6">
            <StatCard 
               title="Total Transactions"
                value={2245}
                // icon="bi-people-fill"
                color="primary"
                bgclass='stat-bg3'
            />
        </div>

         <div className="col-md-6 col-lg-3 col-sm-6">
            <StatCard 
               title="Total Amount"
                value={3045}
                // icon="bi-people-fill"
                color="primary"
                 bgclass='stat-bg4'
            />
        </div>
       
      </div>

      <div className="row g-3">
        <div className="col-lg-12">
          <Card title="Chart">
            <DashboardChart title='Chart' />
          </Card>
        </div>
      </div>


      



      <div className="row g-3 mt-2">
        <div className="col-lg-6">
          
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
        <div className="col-lg-6">
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