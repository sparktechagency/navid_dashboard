import React, { useState } from "react";
import { Table, Input, Radio, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PageHeading from "../../Components/Shared/PageHeading";

const ManageProducts = () => {
  const [status, setStatus] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Dummy Data for Orders
  const orders = [
    {
      orderNo: "#12333",
      email: "fahim@gmail.com",
      totalItems: 4,
      price: "$15",
      deliveryTime: "05/12/2024",
      status: "Pending",
    },
    {
      orderNo: "#12334",
      email: "nadir@gmail.com",
      totalItems: 4,
      price: "$15",
      deliveryTime: "05/12/2024",
      status: "Packing",
    },
    {
      orderNo: "#12335",
      email: "alamir@gmail.com",
      totalItems: 4,
      price: "$15",
      deliveryTime: "05/12/2024",
      status: "Processing",
    },
    {
      orderNo: "#12336",
      email: "jems@gmail.com",
      totalItems: 4,
      price: "$15",
      deliveryTime: "05/12/2024",
      status: "Shipping",
    },
    {
      orderNo: "#12337",
      email: "bobi@gmail.com",
      totalItems: 4,
      price: "$10",
      deliveryTime: "05/12/2024",
      status: "Shipped",
    },
    // Add more dummy data if needed
  ];

  // Filter data based on the search text and status
  const filteredData = orders.filter((order) => {
    const matchesSearchText = order.email
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus = status === "All" || order.status === status;
    return matchesSearchText && matchesStatus;
  });

  // Table Columns
  const columns = [
    {
      title: "Order No",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      key: "totalItems",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Delivery Time",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => {
            // You can add functionality to handle status change if needed
          }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Packing">Packing</Select.Option>
          <Select.Option value="Processing">Processing</Select.Option>
          <Select.Option value="Shipping">Shipping</Select.Option>
          <Select.Option value="Shipped">Shipped</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <PageHeading text={"Manage Order"} />
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
        dataSource={filteredData}
        columns={columns}
        rowKey="orderNo"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ManageProducts;
