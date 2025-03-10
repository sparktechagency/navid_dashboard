import React from "react";
import Sidebar from "../Components/Shared/Sidebar";
import Header from "../Components/Shared/Header.jsx";
import { Outlet } from "react-router";
const Dashboard = () => {
  return (
    <div className="max-h-screen bg-[#3872F0] overflow-hidden">
      <Header />
      <div className="scroll-bar-hide flex gap-0 h-screen overflow-y-scroll">
        <div className="mt-[2px] scroll-bar-hide pt-4 w-[300px] h-[calc(100vh-64px)] overflow-y-scroll pb-10 box-border bg-[var(--color-green)]">
          <Sidebar />
        </div>
        <div className="w-[calc(100%-300px)] bg-[var(--color-gray-20)] h-screen">
          <div className="bg-[#f2f2f2] mt-[17px] scroll-bar-hide w-full p-5 rounded-md h-[calc(100vh-110px)] overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
