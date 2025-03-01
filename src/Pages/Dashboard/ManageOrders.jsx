import React, { useState } from "react";
import { Button, Form, Input, Popconfirm, Radio, Table } from "antd";
import { FaEdit } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Tabs = ["Wholesaler", "Only User"];

const ManageOrder = () => {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(Tabs[0]);
  const [searchKey, setSearchKey] = useState("");
  console.log(searchKey);

  const allData = [
    {
      id: "#12333",
      productName: "Cucumber",
      category: "Foods",
      price: "$15",
      image:
        "https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/cucumber.jpg",
      type: "Wholesaler",
    },
    {
      id: "#12334",
      productName: "Egg",
      category: "Foods",
      price: "$15",
      image:
        "https://media.istockphoto.com/id/589415708/photo/fresh-fruits-and-vegetables.jpg?s=612x612&w=0&k=20&c=aBFGUU-98pnoht73co8r2TZIKF3MDtBBu9KSxtxK_C0=",
      type: "Only User",
    },
    {
      id: "#12335",
      productName: "Cake",
      category: "Foods",
      price: "$15",
      image:
        "https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/cucumber.jpg",
      type: "Wholesaler",
    },
    {
      id: "#12336",
      productName: "Papaya",
      category: "Foods",
      price: "$15",
      image:
        "https://media.istockphoto.com/id/589415708/photo/fresh-fruits-and-vegetables.jpg?s=612x612&w=0&k=20&c=aBFGUU-98pnoht73co8r2TZIKF3MDtBBu9KSxtxK_C0=",
      type: "Only User",
    },
  ];

  const filteredData = allData.filter((item) => item.type === tab);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Products Name",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={record.productName}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex items-center">
          <Button shape="circle">
            <FaEdit className="text-blue-500 cursor-pointer mr-2" />
          </Button>

          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description="Are you sure you want to delete this Product?"
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
    <>
      <div className="between-center gap-2 mb-4">
        <PageHeading text="Manage Products" />
      </div>
      <div className="end-center gap-2">
        <Form layout="inline" className="!w-[300px]">
          <Form.Item className="!w-full">
            <Input
              className="!h-11 !w-full"
              placeholder="Search Products"
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
            />
          </Form.Item>
        </Form>
        <Link to={"/add-product"}>
          <Button
            onClick={() => setCategoryModalOpen(true)}
            style={{
              maxWidth: "220px",
              justifyContent: "center",
              height: "44px",
            }}
          >
            Add New Category <FaPlus />
          </Button>
        </Link>
      </div>
      <div className="p-2 rounded">
        <div className="start-center mb-3">
          {Tabs.map((item) => (
            <Radio
              onChange={() => {
                setTab(item);
                setPage(1);
              }}
              className="text-[var(--white-600)]"
              checked={item === tab}
              value={item}
              key={item}
            >
              {item}
            </Radio>
          ))}
        </div>
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: filteredData.length,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
          }}
        />
      </div>
    </>
  );
};

export default ManageOrder;
