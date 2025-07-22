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
      'Nov', 'Dec'
    ];

    const dataValues = [
      1200, 1500, 1800, 1300, 1600,
      1700, 1400, 1900, 2000, 1700,
      1800, 2100
    ];

    // bar background color Purple to Pink Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 150, 136, 0.9)');
    gradient.addColorStop(1, 'rgba(205, 220, 57, 0.4)');


    const chart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Performance',
            data: dataValues,
            backgroundColor: gradient,
            borderWidth: 0,
            barThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: '#000',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 10,
            cornerRadius: 8
          },
          title: {
            display: true,
            text: 'Performance Overview (12 Data Points)',
            color: '#555',
            font: {
              size: 14,
            },
            padding: {
              top: 10,
            },
            position: 'bottom' // or 'top'
          },

          legend: {
            position: 'bottom',
            labels: {
              color: '#555',
              font: {
                size: 14
              }
            }
          }

        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            ticks: {
              maxRotation: 60,
              minRotation: 45
            },
            grid :{
              display:false
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
