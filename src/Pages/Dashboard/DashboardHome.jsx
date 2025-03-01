import React from "react";
import OverviewCart from "../../Components/Shared/OverviewCart";
import UserGrowth from "../../Components/Chart/UserGrowth";
import SubscriptionGrowth from "../../Components/Chart/SubscriptionGrowth";
import NewSubscrider from "../../Components/Shared/NewSubscrider";
function DashboardHome() {
  const overViewDataArray = [
    { title: "Total User", value: 1000},
    { title: "Total Subscriber", value: 44 },
    { title: "Total Category", value: 45 },
    { title: "Total Earning", value: 4323 },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 bg-[#fff] rounded-md p-2 overflow-hidden ">
        {overViewDataArray.map((item, idx) => (
          <OverviewCart data={item} idx={idx} key={idx} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <SubscriptionGrowth />
        <UserGrowth />
      </div>
      <NewSubscrider />
    </div>
  );
}

export default DashboardHome;
