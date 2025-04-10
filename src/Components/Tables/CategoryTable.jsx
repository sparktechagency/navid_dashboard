import React from 'react';
import { Table } from 'antd';
import UserImage from '../../Utils/Sideber/UserImage';
import { Space, Button } from 'antd';
import { IoEyeSharp } from 'react-icons/io5';
const CategoryTable = ({ data, pagination }) => {
  const paymentDataInformation =
    data.map((payment, index) => ({
      key: payment._id,
      sl_No: index + 1,
      user: {
        name: payment?.user?.name || 'N/A',
        email: payment?.user?.email || 'N/A',
        profile_image:
          'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg' ||
          payment?.user?.profile_image,
        phoneNumber: payment?.user?.phoneNumber || 'N/A',
        location: payment?.user?.location || 'N/A',
      },
    })) || [];

  const columns = [
    {
      title: 'Sl no.',
      dataIndex: 'sl_No',
      key: 'sl_No',
      render: (sl_No) => <p>#{sl_No}</p>,
    },
    {
      title: 'User Info',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <UserImage
          image={user?.profile_image}
          name={user?.name}
          email={user?.email}
        />
      ),
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'phoneNumber',
    },
    {
      title: 'Phone Number',
      dataIndex: ['user', 'phoneNumber'],
      key: 'phoneNumber',
    },

    {
      title: 'Location',
      dataIndex: ['user', 'location'],
      key: 'location',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="default" shape="circle">
            <IoEyeSharp />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
      rowClassName={() => 'table-row'}
      className="mt-2"
      dataSource={paymentDataInformation}
      columns={columns}
      pagination={pagination}
    />
  );
};

export default CategoryTable;
