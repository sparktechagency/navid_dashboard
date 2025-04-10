import React, { useState } from 'react';
import { Popconfirm, Table, Modal } from 'antd';
import UserImage from '../../Utils/Sideber/UserImage';
import { Space, Button } from 'antd';
import { IoEyeSharp } from 'react-icons/io5';
import { MdBlock } from 'react-icons/md';
import {
  useBlockUserMutation,
  useGetAllUserQuery,
} from '../../Redux/services/userApis';
import toast from 'react-hot-toast';
const UserManageTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: userData, isLoading } = useGetAllUserQuery();
  const [blockUser] = useBlockUserMutation();
  const paymentDataInformation =
    userData?.data?.map((payment, index) => ({
      key: payment._id,
      sl_No: index + 1,
      user: {
        name: payment?.name || 'N/A',
        email: payment?.email || 'N/A',
        profile_image:
          payment?.img ||
          'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
        phoneNumber: payment?.phone || 'N/A',
        location: payment?.location || 'N/A',
        isBlock: payment.block,
      },
    })) || [];

  const handleBlock = async (id) => {
    try {
      const res = await blockUser({ id });

      if (res?.data?.success) {
        toast.success(res?.data?.message || 'User blocked successfully');
      } else {
        toast.error(res?.data?.message || 'User blocked failed');
      }
    } catch (error) {
      toast.error(error?.message || 'An unexpected error occurred');
    }
  };
  const showUserModal = (record) => {
    setSelectedUser(record.user);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
          <Button
            onClick={() => showUserModal(record)}
            type="default"
            shape="circle"
          >
            <IoEyeSharp />
          </Button>

          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description="Are you sure you want to block this user?"
            onConfirm={() => handleBlock(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className={`${
                record?.user?.isBlock ? '!bg-red-500' : '!bg-green-500'
              }  `}
              type="default"
              shape="circle"
            >
              <MdBlock />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        loading={isLoading}
        rowClassName={() => 'table-row'}
        className="mt-2"
        dataSource={paymentDataInformation}
        columns={columns}
        pagination={{ pageSize: 9 }}
      />
      <Modal
        title="User Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            className="!text-white !bg-[#08765F]"
            key="back"
            onClick={handleCancel}
          >
            Close
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <UserImage
              image={selectedUser.profile_image}
              name={selectedUser.name}
              email={selectedUser.email}
            />
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedUser.phoneNumber}
            </p>
            <p>
              <strong>Location:</strong> {selectedUser.location}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserManageTable;
