import React, { useState, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Select } from "antd";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

const SubscriptionGrowth = () => {
  const canvasRef = useRef(null);
  const yearOptions = Array.from({
    length: new Date().getFullYear() - 2024 + 1,
  }).map((_, i) => (
    <Select.Option key={2024 + i} value={2024 + i}>
      {2024 + i}
    </Select.Option>
  ));

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Overview data",
        data: [5, 15, 10, 25, 20, 30, 25, 40, 35, 45, 40, 50],
        borderColor: "#094c3f",
        borderWidth: 3,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#3872F0");
          gradient.addColorStop(1, "#3872F0");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 5, 
        pointHoverRadius: 7,
        // pointBackgroundColor: "#094c3f",
      },
    ],
  };

  const handleYearChange = (value) => setYear(value);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
        },
      },
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode: "nearest",
      intersect: false,
    },
  };

  return (
    <div className=" bg-[#fff] rounded p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-[#222]">Subscription Growth</h1>
        <Select
          defaultValue={year}
          style={{ width: 120 }}
          onChange={handleYearChange}
        >
          {yearOptions}
        </Select>
      </div>
      <div className="w-full mt-4 h-[400px]">
        <Line ref={canvasRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default SubscriptionGrowth;
