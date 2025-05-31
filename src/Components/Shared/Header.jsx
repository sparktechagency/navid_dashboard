import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/logo.svg';
import toast from 'react-hot-toast';
import { useGetProfileDataQuery } from '../../Redux/services/profileApis';
import { imageUrl } from '../../Utils/server';
function Header() {
  const route = useNavigate();
  const { data: profileData, isLoading: profileLoading } =
    useGetProfileDataQuery();
  const user = {
    photoURL: profileData?.data?.img,
    displayName: profileData?.data?.name,
    email: profileData?.data?.email,
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful');
    route('/login');
  };

  const menu = (
    <Menu className="w-fit rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Avatar size={48} src={imageUrl(user?.photoURL)} />
        <div>
          <h1 className="font-semibold text-base">{user?.displayName}</h1>
          <h1 className="font-normal opacity-75 text-sm">{user?.email}</h1>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="px-10 shadow shadow-black bg-white h-16 flex justify-between items-center">
      <img className="h-8" src={logo} alt="DealScout" />
      {profileLoading ? (
        ''
      ) : (
        <div className="flex items-center !border-[1px] rounded-full gap-4 text-2xl">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <Avatar
              size={40}
              src={imageUrl(user?.photoURL)}
              className="cursor-pointer "
            />
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default Header;
