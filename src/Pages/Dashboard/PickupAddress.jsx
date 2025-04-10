import { Table, Modal, Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import PageHeading from '../../Components/Shared/PageHeading';
import {
  useDeletePickupAddressMutation,
  useGetAllpickupAddressQuery,
} from '../../Redux/services/addressApis';
import { MdDelete } from 'react-icons/md';
import CreatePickUpModal from '../../Components/modal/CreatePickUpModal';
import toast from 'react-hot-toast';

const PickupAddress = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { data: PickupAddress, isLoading: pickupAddressLoading } =
    useGetAllpickupAddressQuery();

  const [deleteAddress, { isLoading: addressDelete }] =
    useDeletePickupAddressMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteAddress({id});
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center">
          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <MdDelete className="cursor-pointer text-red-500 text-2xl" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <PageHeading text="Manage Pickup Addresses" />
      </div>
      <div className="flex mb-3 justify-between items-center">
        <Button
          onClick={() => setCategoryModalOpen(true)}
          style={{
            maxWidth: '220px',
            justifyContent: 'center',
            height: '44px',
          }}
          icon={<FaPlus />}
        >
          Add New Pickup Address
        </Button>
      </div>
      <Table
        bordered
        loading={pickupAddressLoading}
        rowKey="_id"
        columns={columns}
        dataSource={PickupAddress?.data || []}
      />
      <Modal
        title="Add Pick up Address"
        open={categoryModalOpen}
        onCancel={() => setCategoryModalOpen(false)}
        footer={false}
        centered
      >
        <CreatePickUpModal closeModal={() => setCategoryModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default PickupAddress;
