import React, { useEffect, useRef } from 'react'

const UsersCharts = () => {
    const canvasRef = useRef(null); 

  useEffect(() => {
    // Role count based on your dataset
    const roleCounts = {
      admin: 4,
      business: 7,
      recipient: 9
    };

    const data = {
      labels: ['Admin', 'Business', 'Recipient'],
      datasets: [{
        label: 'User Role Distribution',
        data: [roleCounts.admin, roleCounts.business, roleCounts.recipient],
        backgroundColor: [
          'rgba(201, 45, 141, 0.7)',
          'rgba(11, 147, 238, 0.6)',
          'rgba(241, 183, 35, 0.6)'
        ],
        borderColor: [
          'rgba(201, 45, 141, 1)',
          'rgba(11, 147, 238, 1)',
          'rgba(241, 183, 35, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Distribution of User Roles'
        }
      }
    };

    // Clean up existing chart instance (important in React)
    let chartInstance = null;
    if (window.Chart) {
      if (canvasRef.current.chartInstance) {
        canvasRef.current.chartInstance.destroy();
      }
      chartInstance = new window.Chart(canvasRef.current, {
        type: 'pie',
        data,
        options
      });
      canvasRef.current.chartInstance = chartInstance;
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display:'flex', justifyContent:'center' }} className='py-2'>

       <canvas ref={canvasRef} width="260" height="260" className='mb-1'/>

        
    </div>
  )
}

export default UsersCharts