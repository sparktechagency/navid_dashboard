import React from "react";

const formatValue = ({ value }) => {
  if (value === undefined) return "N/A";
  return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value?.toString();
};

const OverviewCart = ({ data, idx }) => {
  const { title, value } = data;

  return (
    <div
      className={`w-full items-center py-3 h-[130px] bg-[#fff] text-[#222] p-3 px-10 flex flex-col justify-center gap-2 
      ${idx !== 3 ? "border-r-[1px] border-[#6d6d6d]" : ""}`}
    >
      <p className="text-sm font-medium text-[var(--white-600)]">{title}</p>
      <p className="text-3xl text-[var(--white-600)] font-semibold">
        {formatValue({ value })}
      </p>
    </div>
  );
};

export default OverviewCart;
