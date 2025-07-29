import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const PayoutsChart = () => {
  const chartRef = useRef();
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    fetch("../data/payout.json")
      .then((res) => res.json())
      .then((data) => setRawData(data));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { beginAtZero: true, title: { display: true, text: "Amount (INR)" } },
    },
  };

  if (!rawData) return <p>Loading...</p>;

  // Aggregate by date
  const totalsByDate = {};
  rawData.forEach((p) => {
    const d = p.created_at.split("T")[0];
    totalsByDate[d] = (totalsByDate[d] || 0) + p.total_amount;
  });
  const dates = Object.keys(totalsByDate).sort();
  const amounts = dates.map((d) => totalsByDate[d]);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Total Payout (INR)",
        data: amounts,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderColor: "rgb(177, 7, 154)",
        backgroundColor: ({ chart }) => {
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(177,7,154,0.2)"; // fallback
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(24, 23, 24, 0.3)");
          gradient.addColorStop(1, "rgba(215, 119, 252, 0.5)");
          return gradient;
        },
      },
    ],
  };

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default PayoutsChart;
