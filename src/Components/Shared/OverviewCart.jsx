import React from 'react';

const formatValue = ({ value }) => {
  if (value === undefined) return 'N/A';
  return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value?.toString();
};

const OverviewCart = ({ data, idx }) => {
  const { title, value } = data;

  return (
    <div
      className={`w-full items-center py-3 h-fit] bg-[#fff] text-[#222] p-3 px-10 flex flex-col gap-2 justify-center 
      ${idx !== 3 ? 'border-r-[1px] border-[#6d6d6d]' : ''}`}
    >
      <img className="w-10 h-10" src={data?.icon} alt={title} />
      <h1 className="text-xl font-black leading-none text-black">{title}</h1>
      <h1 className="text-3xl leading-none text-black font-black">
        {formatValue({ value })}
      </h1>
    </div>
  );
};

export default OverviewCart;
