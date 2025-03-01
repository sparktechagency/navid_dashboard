import React from "react";
import { Link } from "react-router";
import SubscriderTable from "../Tables/SubscirderTable";
import { Button } from "antd";
const data = [
  {
    user: {
      name: "Giring Furqan",
      email: "giring@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+99 248 525652321",
      location: "Indonesia",
    },
  },
  {
    user: {
      name: "John-W-BOSTON",
      email: "john@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+99 458 365652321",
      location: "United States",
    },
  },
  {
    user: {
      name: "Yanto Jericho",
      email: "yanto@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+92 308 32572113",
      location: "Pakistan",
    },
  },
  {
    user: {
      name: "Lukman Farhan",
      email: "lukman@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+98 654 89236547",
      location: "Iran",
    },
  },
  {
    user: {
      name: "Dimas Kamal",
      email: "dimas@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+91 987 6543210",
      location: "India",
    },
  },
  {
    user: {
      name: "Hari Danang",
      email: "hari@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+90 123 4567890",
      location: "Turkey",
    },
  },
  {
    user: {
      name: "Alan Marcus",
      email: "alan@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+93 789 6543210",
      location: "Afghanistan",
    },
  },
  {
    user: {
      name: "Giring Furqan",
      email: "giring@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+99 248 525652321",
      location: "Indonesia",
    },
  },
  {
    user: {
      name: "Lukman Farhan",
      email: "lukman@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+98 654 89236547",
      location: "Iran",
    },
  },
  {
    user: {
      name: "Yanto Jericho",
      email: "yanto@gmail.com",
      profile_image: "https://via.placeholder.com/150",
      phoneNumber: "+92 308 32572113",
      location: "Pakistan",
    },
  },
];
const NewSubscrider = () => {
  return (
    <div className="bg-[var(--black-200)] p-2 rounded mt-4 text-[var(--white-600)]">
      <div className="between-center">
        <p className="text-[#222]">New User Request</p>
        <Link to={`/subscriber-management`}>
          <Button>Vew All</Button>
        </Link>
      </div>
      <SubscriderTable data={data?.slice(0, 5)} pagination={false} />
    </div>
  );
};

export default NewSubscrider;

