import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { useThemeObserver } from "../hooks/useThemeObserver";

// Register Chart.js components
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const TransactionChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const theme = useThemeObserver();

  useEffect(() => {
    let isMounted = true;

    fetch("/data/transaction_logs.json")
      .then((res) => res.json())
      .then((transactions) => {
        if (!isMounted || !chartRef.current) return;

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

        // Destroy previous chart if exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        const gridColor = theme === "dark" ? "#3c4049" : "#e0e0e0";

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: allDates,
            datasets: [
              {
                label: "Success",
                data: successData,
                backgroundColor: "#048274"
              },
              {
                label: "Failed",
                data: failedData,
                backgroundColor: "#aa2a35"
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top"
              },
              title: {
                display: true,
                text: "Transaction Comparison (Success vs Failed)"
              }
            },
            scales: {
              x: {
                stacked: false,
                title: { display: true, text: "Date" },
                grid: {
                  color: gridColor
                }
              },
              y: {
                beginAtZero: true,
                title: { display: true, text: "Amount (INR)" },
                grid: {
                  color: gridColor
                }
              }
            }
          }
        });
      })
      .catch((err) => {
        console.error("Failed to load transaction data:", err);
      });

    return () => {
      isMounted = false;
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [theme]); // re-run on theme change

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TransactionChart;
