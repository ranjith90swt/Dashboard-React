import React from 'react'
import Card from '../components/Card'
import Transactions from './Transactions'
import UserList from './UserList'
import DashboardChart from '../components/DashboardChart'
import { StatCard } from '../components/StatCard'
const Dashboard = () => {

  const stats = [
  {
    title: "Total Users",
    value: 1240,
    color: "primary",
    bgclass: "stat-bg1"
  },
  {
    title: "Total Revenue",
    value: 3240,
    prefix: "$",
    color: "primary",
    bgclass: "stat-bg2"
  },
  {
    title: "Total Transactions",
    value: 2245,
    color: "primary",
    bgclass: "stat-bg3"
  },
  {
    title: "Total Amount",
    value: 3045,
    color: "primary",
    bgclass: "stat-bg4"
  }
]

  return (
    <>
      <h2 className='page-title'>Dashboard</h2>

      <div className='row g-3 mb-4'>
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3 col-sm-6">
            <StatCard 
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              color={stat.color}
              bgclass={stat.bgclass}
            />
          </div>
        ))}
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
           showAddButton = {false}
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
           showAddButton = {false}
          />
        </div>
      </div>

     
    </>

  )
}

export default Dashboard