import React from 'react';
import Dashboard from '../Layout/Dashboard';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import Login from '../Pages/Auth/Login';
import ForgetPassword from '../Pages/Auth/ForgetPassword';
import Otp from '../Pages/Auth/Otp';
import ResetPassword from '../Pages/Auth/ResetPassword';
import { createBrowserRouter } from 'react-router';
import UserManage from '../Pages/Dashboard/UserManage';
import TermsCondition from '../Pages/Dashboard/TermsCondition';
import PrivacyPolicy from '../Pages/Dashboard/PrivacyPolicy';
import Profile from '../Pages/Dashboard/Profile.jsx';
import CategoryManage from '../Pages/Dashboard/CategoryManage.jsx';
import SubcategoryManagement from '../Pages/Dashboard/SubcategoryManagement.jsx';
import ManageOrder from '../Pages/Dashboard/ManageProduct.jsx';
import AddProduct from '../Pages/Dashboard/AddProduct.jsx';
import AllUser from '../Pages/Dashboard/AllUser.jsx';
import ManageProducts from '../Pages/Dashboard/ManageOrders.jsx';
import PrivateRoute from './PrivetRoute.jsx';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <DashboardHome />,
      },
      {
        path: '/manage-user',
        element: <UserManage />,
      },
      {
        path: '/subscriber-management',
        element: <AllUser />,
      },
      {
        path: '/add-product',
        element: <AddProduct />,
      },
      {
        path: '/manage-order',
        element: <ManageOrder />,
      },
      {
        path: '/manage-products',
        element: <ManageProducts />,
      },
      {
        path: '/addcategory-management',
        element: <SubcategoryManagement />,
      },
      {
        path: '/manage-category',
        element: <CategoryManage />,
      },
      {
        path: '/terms-&-condition',
        element: <TermsCondition />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
  {
    path: '/otp',
    element: <Otp />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);
