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
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
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
    <div style={{ width: '100%', height: '100%', display:'flex', justifyContent:'center' }}>

       <canvas ref={canvasRef} width="260" height="260" />

        
    </div>
  )
}

export default UsersCharts