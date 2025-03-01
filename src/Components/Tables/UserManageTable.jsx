import React, { useState } from "react";
import { Popconfirm, Table, Modal } from "antd";
import UserImage from "../../Utils/Sideber/UserImage";
import { Space, Button } from "antd";
import { IoEyeSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
const UserManageTable = ({ data, pagination }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const paymentDataInformation =
    data.map((payment, index) => ({
      key: payment._id,
      sl_No: index + 1,
      user: {
        name: payment?.user?.name || "N/A",
        email: payment?.user?.email || "N/A",
        profile_image:
          "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" ||
          payment?.user?.profile_image,
        phoneNumber: payment?.user?.phoneNumber || "N/A",
        location: payment?.user?.location || "N/A",
      },
    })) || [];
  const showUserModal = (record) => {
    setSelectedUser(record.user);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "Sl no.",
      dataIndex: "sl_No",
      key: "sl_No",
      render: (sl_No) => <p>#{sl_No}</p>,
    },
    {
      title: "User Info",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <UserImage
          image={user?.profile_image}
          name={user?.name}
          email={user?.email}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "phoneNumber",
    },
    {
      title: "Location",
      dataIndex: ["user", "location"],
      key: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" shape="circle">
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
        rowClassName={() => "table-row"}
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
