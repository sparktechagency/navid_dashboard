import React, { useState } from 'react';
import { Table, Modal, Space, Button, message } from 'antd';
import UserImage from '../../Utils/Sideber/UserImage';
import { FaFilePdf } from 'react-icons/fa';

const AllSubscriberTable = ({ data, pagination }) => {
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Show Approve Modal
  const showApproveModal = (record) => {
    setSelectedUser(record.user);
    setIsApproveModalVisible(true);
  };

  // Handle Confirm
  const handleConfirm = () => {
    setIsApproveModalVisible(false);
    message.success('User Approved Successfully!');
  };

  // Handle Modal Close
  const handleCancel = () => {
    setIsApproveModalVisible(false);
  };

  const paymentDataInformation = data.map((payment, index) => ({
    key: payment._id,
    sl_No: `#12333`, // Static serial number
    Documentation: (
      <FaFilePdf
        style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }}
      />
    ),
    user: {
      name: payment?.user?.name || 'N/A',
      age: payment?.user?.age ? `Age: ${payment?.user?.age}` : 'Age: N/A',
      email: payment?.user?.email || 'N/A',
      profile_image:
        payment?.user?.profile_image || 'https://via.placeholder.com/50',
      location: payment?.user?.location || 'N/A',
      pdf_url: payment?.pdf_url || '/test.pdf', // Mock PDF URL
    },
  }));

  const columns = [
    {
      title: 'S no.',
      dataIndex: 'sl_No',
      key: 'sl_No',
      render: (sl_No) => <p style={{ fontWeight: 'bold' }}>{sl_No}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={user?.profile_image}
            alt="profile"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{user?.name}</p>
            <span style={{ fontSize: '12px', color: '#777' }}>{user?.age}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Documentations',
      key: 'Documentation',
      dataIndex: 'Documentation',
      render: (doc) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>{doc}</div>
      ),
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Location',
      dataIndex: ['user', 'location'],
      key: 'location',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => showApproveModal(record)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '20px',
            }}
          >
            Approve
          </Button>
          <Button
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              borderRadius: '20px',
            }}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        rowClassName={() => 'table-row'}
        className="mt-2"
        dataSource={paymentDataInformation}
        columns={columns}
        pagination={pagination}
        scroll={{ x: 1500 }}
      />

      {/* Approve Modal */}
      <Modal
        title="Approve User"
        open={isApproveModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirm}
            style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
          >
            Confirm
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
              <strong>Age:</strong> {selectedUser.age}
            </p>
            <p>
              <strong>Location:</strong> {selectedUser.location}
            </p>
            <div style={{ marginTop: '15px' }}>
              <strong>PDF Preview:</strong>
              <iframe
                src={selectedUser.pdf_url}
                title="PDF Preview"
                style={{
                  width: '100%',
                  height: '300px',
                  border: '1px solid #ddd',
                  marginTop: '10px',
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AllSubscriberTable;
