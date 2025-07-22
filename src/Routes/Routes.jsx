import React from "react";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Otp from "../Pages/Auth/Otp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import { createBrowserRouter } from "react-router";
import UserManage from "../Pages/Dashboard/UserManage";
import TermsCondition from "../Pages/Dashboard/TermsCondition";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import Profile from "../Pages/Dashboard/Profile";
import CategoryManage from "../Pages/Dashboard/CategoryManage";
import SubCategoryManage from "../Pages/Dashboard/SubCategoryManage";
import PickupAddress from "../Pages/Dashboard/PickupAddress";
import ManageOrder from "../Pages/Dashboard/ManageOrders";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AllUser from "../Pages/Dashboard/AllUser";
import PrivateRoute from "./PrivetRoute";
import ProductEditing from "../Pages/Dashboard/ProductEditing";
import ManageProducts from "../Pages/Dashboard/ManageProduct"
export const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/manage-user",
        element: <UserManage />,
      },
      {
        path: "/subscriber-management",
        element: <AllUser />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/edit-product/:id",
        element: <ProductEditing />,
      },
      {
        path: "/manage-order",
        element: <ManageOrder />,
      },
      {
        path: "/manage-products",
        element: <ManageProducts />,
      },
      {
        path: "/pickup-address",
        element: <PickupAddress />,
      },
      {
        path: "/manage-category",
        element: <CategoryManage />,
      },
      {
        path: "/manage-subcategory",
        element: <SubCategoryManage />,
      },
      {
        path: "/terms-&-condition",
        element: <TermsCondition />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);
