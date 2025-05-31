import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useGetProfileDataQuery } from '../Redux/services/profileApis';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isAuthorized, setIsAuthorized] = useState(false);
  // const { data } = useGetProfileDataQuery();
  // const role = data?.data?.role;

  // useEffect(() => {
  //   if (role === 'ADMIN') {
  //     setIsLoading(true);
  //     toast.success('Welcome Admin');
  //     setIsAuthorized(true);
  //     setIsLoading(false);
  //   } else {
  //     toast.error('You are not authorized');
  //     localStorage.removeItem('token');
  //     setIsAuthorized(false);
  //   }
  //   setIsLoading(false);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-screen">
  //       <span className="loader-black"></span>
  //     </div>
  //   );
  // }

  const location = useLocation();
  if (!localStorage.getItem('token'))
    return <Navigate to={`/login`} state={location.pathname}></Navigate>;
  const { data, isLoading, isError, isFetching } =
    useGetProfileDataQuery();
  if (isLoading || isFetching)
    return (
      <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center  bg-opacity-50 z-50">
        <span className="loader"></span>
      </div>
    );
  if (isError) {
    // toast.dismiss()
    // toast.error(error?.data?.message || 'something went wrong please login Again')
    return <Navigate to={`/login`} state={location.pathname}></Navigate>;
  }
  if (data?.data?.role !== 'ADMIN') {
    toast.dismiss();
    toast.error('you are not authorized to access this page');
    localStorage.removeItem('token');
    return <Navigate to={`/login`} state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
