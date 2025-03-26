import React from 'react';
import OverviewCart from '../../Components/Shared/OverviewCart';
import UserGrowth from '../../Components/Chart/UserGrowth';
import SubscriptionGrowth from '../../Components/Chart/SubscriptionGrowth';
import NewSubscrider from '../../Components/Shared/NewSubscrider';
import { useGetOverViewQuery } from '../../Redux/services/overViewApis';
function DashboardHome() {
  const { data, isLoading } = useGetOverViewQuery({});

  const overViewDataArray = [
    { title: 'Total User', value: data?.user || 0 },
    { title: 'Total Category', value: data?.total_category || 0 },
    {
      title: 'Total Product',
      value: data?.whole_sale_product + data?.normal_product || 0,
    },
    { title: 'Total Earning', value: data?.total_earning || 0 },
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
      {/* <NewSubscrider /> */}
    </div>
  );
}

export default DashboardHome;
