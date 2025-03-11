import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Select } from 'antd';
import { useGetOverViewQuery } from '../../Redux/services/overViewApis';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const UserGrowth = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data: userData, isLoading } = useGetOverViewQuery({
    year_user: year,
  });

  const chartData = userData?.userGrowth?.data;

  const data = {
    labels: userData?.userGrowth?.monthNames,
    datasets: [
      {
        label: 'Monthly Users',
        data: chartData,
        backgroundColor: '#007bff',
        borderRadius: 5,
      },
    ],
  };

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
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleYearChange = (value) => {
    setYear(value);
    console.log(`Selected Year: ${value}`);
  };

  const yearOptions = userData?.users_year.map((yr, i) => {
    return (
      <Select.Option key={2024 + i} value={yr}>
        {yr}
      </Select.Option>
    );
  });

  return (
    <div className="w-full h-full bg-[#fff] rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="text-[#222]">User Growth</h1>
        <Select
          defaultValue={year}
          style={{ width: 120 }}
          onChange={handleYearChange}
        >
          {yearOptions}
        </Select>
      </div>
      <div className=" mt-4 h-[400px]">
        <Bar
          data={{
            ...data,
            datasets: [{ ...data.datasets[0], backgroundColor: '#3872F0' }],
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default UserGrowth;
