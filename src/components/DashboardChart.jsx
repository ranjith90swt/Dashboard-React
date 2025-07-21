import React, { useEffect, useRef } from 'react';

const DashboardChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.Chart) return;

    const ctx = canvasRef.current.getContext('2d');

    if (canvasRef.current._chartInstance) {
      canvasRef.current._chartInstance.destroy();
    }

    const labels = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May',
      'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
      'Nov', 'Dec', 'Week 1', 'Week 2', 'Week 3',
      'Week 4', 'Q1', 'Q2', 'Q3', 'Q4'
    ];

    const dataValues = [
      1200, 1500, 1800, 1300, 1600,
      1700, 1400, 1900, 2000, 1700,
      1800, 2100, 1100, 1500, 1600,
      1700, 5000, 5400, 5200, 6000
    ];

    const chart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Performance',
            data: dataValues,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Performance Overview (20 Data Points)'
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            ticks: {
              maxRotation: 60,
              minRotation: 45
            }
          }
        }
      }
    });

    canvasRef.current._chartInstance = chart;

    return () => chart.destroy();
  }, []);

  return (
    <div
      style={{
        width: '100%',
      
        height: '400px',
        padding: '1rem'
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DashboardChart;
