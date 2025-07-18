import React from 'react'
import Card from '../components/Card'

const Dashboard = () => {
  return (
    <>
    <h2 className='page-title'>Dashboard</h2>
      <div className='d-flex flex-row flex-wrap gap-3'>
        <div className="w-25">
            <Card title='Test Card'
            description = 'Hi this test card'
            />
        </div>
        <Card title='Test Card'/>
        <Card title='Test Card'/>
        <Card title='Test Card'/>
      </div>
    </>

  )
}

export default Dashboard