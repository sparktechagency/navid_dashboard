import React, { useState, useRef } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Select } from 'antd';
import { useGetOverViewQuery } from '../../Redux/services/overViewApis';

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
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: userGrowth, isLoading } = useGetOverViewQuery({
    year_payment: year,
  });
  const yearOptions = userGrowth?.payment_year?.map((yr, i) => {
    return (
      <Select.Option key={2024 + i} value={yr}>
        {yr}
      </Select.Option>
    );
  });
  const data = {
    labels: userGrowth?.earningGrowth?.monthNames,
    datasets: [
      {
        label: 'Overview data',
        data: userGrowth?.earningGrowth?.data,
        borderColor: '#094c3f',
        borderWidth: 3,
        fill: true,
        backgroundColor: (context) => {
          const chart = context?.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, '#3872F0');
          gradient.addColorStop(1, '#3872F0');
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
        mode: 'nearest',
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
      mode: 'nearest',
      intersect: false,
    },
  };

  return (
    <div className=" bg-[#fff] rounded p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-[#222]">Earning Growth</h1>
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
