import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import logo from '../../assets/logo.svg';
function Header() {
  const user = {
    photoURL: 'https://cdn-icons-png.flaticon.com/512/219/219988.png',
    displayName: 'Micheal Scott',
    email: 'Micheal46@gmail.com',
  };

  const handleSignOut = () => {
    console.log('sign out');
    window.location.href = '/login';
  };

  const menu = (
    <Menu className="w-fit rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Avatar size={48} src={user?.photoURL} />
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
      <div className="text-center text-gray-400 text-sm p-2">v1.10</div>
    </Menu>
  );

  return (
    <div className="px-10 border-b-[1px] border-[#6d6d6d] h-16 flex justify-between items-center">
      <img className="h-8" src={logo} alt="DealScout" />
      <div className="flex items-center  gap-4 text-2xl">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Avatar size={40} src={user?.photoURL} className="cursor-pointer" />
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
