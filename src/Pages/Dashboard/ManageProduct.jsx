import React, { useState } from 'react';
import { Table, Input, Select, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PageHeading from '../../Components/Shared/PageHeading';
import {
  useGetAllOrderQuery,
  useUpdateOrderStatusMutation,
} from '../../Redux/services/orderApis';
import toast from 'react-hot-toast';

const ManageProducts = () => {
  const [searchText, setSearchText] = useState('');
  const {
    data: orderData,
    isLoading: dataLoading,
    refetch,
  } = useGetAllOrderQuery({
    search: searchText,
  });
  const [updateStatus] = useUpdateOrderStatusMutation();

  const updateStatusHandle = async (id, value) => {
    try {
      const data = {
        delivery_status: value,
      };
      const res = await updateStatus({ id, data }).unwrap();
      toast.success('Status updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };
console.log(orderData)
  const orders = orderData?.data || [];

  const columns = [
    {
      title: 'Order No',
      dataIndex: '_id',
      key: '_id',
      render: (id) => `#${id.substring(0, 5)}`,
    },
    {
      title: 'User Email',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user.email,
    },
    {
      title: 'Total Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) =>
        items.reduce((total, item) => total + item.quantity, 0),
    },
    {
      title: 'Price',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (price) => `$ ${price.toFixed(2)}`,
    },
    {
      title: 'Delivery Time',
      dataIndex: 'estimated_delivery_date',
      key: 'estimated_delivery_date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'delivery_status',
      key: 'delivery_status',
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => updateStatusHandle(record._id, value)}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="packing">Packing</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="shipping">Shipping</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <PageHeading text={'Manage Order'} />
        <div className="flex gap-4">
          {/* Search Bar */}
          <Input
            placeholder="Search by User Email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            suffix={<SearchOutlined />}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <Table
        loading={dataLoading}
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ManageProducts;
