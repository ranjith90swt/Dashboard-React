import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  BarController,
  LineController
} from 'chart.js';
import { color } from "chart.js/helpers";

Chart.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  BarController,
  LineController
);


const StatusTrackingChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetch("/data/transaction_logs.json")
      .then((res) => res.json())
      .then((transactions) => {
        const dailySuccess = {};
        const dailyFailed = {};

        transactions.forEach((txn) => {
          const date = new Date(txn.timestamp).toISOString().split("T")[0];
          if (txn.status === "success") {
            dailySuccess[date] = (dailySuccess[date] || 0) + txn.amount;
          } else {
            dailyFailed[date] = (dailyFailed[date] || 0) + txn.amount;
          }
        });

        const allDates = Array.from(
          new Set([...Object.keys(dailySuccess), ...Object.keys(dailyFailed)])
        ).sort();

        const successData = allDates.map((date) => dailySuccess[date] || 0);
        const failedData = allDates.map((date) => dailyFailed[date] || 0);

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");

      chartInstanceRef.current = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: allDates,
    datasets: [
      {
        label: 'Success',
        data: successData,
        backgroundColor: '#048274',
        type: 'line',
        stack: 'stack1',
        fill:false,
        borderColor:'green'
      },
      {
        label: 'Failed',
        data: failedData,
        borderColor: '#aa2a35',
        backgroundColor: 'rgba(168, 78, 87, 0.3)',
        type: 'line',
        tension: 0.3,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#aa2a35',
        yAxisID: 'y',
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Status (Success vs Failed)'
      }
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Date'
        },
        // grid:{
        //     color:'yellow'
        // },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (INR)'
        },
        // grid:{
        //     color:'pink'
        // }
      }
    }
  }
});

    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StatusTrackingChart;
