import React from "react";
import { BiCategory } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineNumberedList } from "react-icons/hi2";
import { LuCalendarClock } from "react-icons/lu";
import {
  MdCreditCard,
  MdManageSearch,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";

export const SidebarLink = [
  {
    path: "/",
    label: "Dashboard",
    icon: <LuCalendarClock size={24} />,
  },
  {
    path: "/manage-category",
    label: "Manage Category",
    icon: <MdManageSearch size={24} />,
  },
  {
    path: "/addcategory-management",
    label: "Add Sub Category",
    icon: <TbCategoryPlus size={24} />,
  },
  {
    path: "/manage-order",
    label: "Manage Order",
    icon: <HiOutlineNumberedList size={24} />,
  },
  {
    path: "/manage-user",
    label: "Manage User",
    icon: <RiTeamFill size={24} />,
  },

  {
    path: "/manage-products",
    label: "Manage Products",
    icon: <MdOutlineProductionQuantityLimits size={24} />,
  },
];

export const SettingLinks = [
  {
    path: "/terms-&-condition",
    label: "Terms & Condition",
  },

  {
    path: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    path: "/profile",
    label: "Profile",
  },
];
