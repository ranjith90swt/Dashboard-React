import React from 'react'
import Card from '../components/Card'
import ProductList from './ProductList'
import UserList from './UserList'
import DashboardChart from '../components/DashboardChart'
const Dashboard = () => {
  return (
    <>
      <h2 className='page-title'>Dashboard</h2>

      <div className='d-flex flex-row gap-4 mb-4'>
        <div className="w-25">
          <Card title='Test Card'
            description='Hi this test card'
          />
        </div>

         <div className="w-25">
            <Card title='Test Card'
            description = 'Hi this test card'
            />
        </div>

         <div className="w-25">
            <Card title='Test Card'
            description = 'Hi this test card'
            />
        </div>

         <div className="w-25">
            <Card title='Test Card'
            description = 'Hi this test card'
            />
        </div>
       
      </div>



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
      <DashboardChart title='Chart' />
    </>

  )
}

export default Dashboard