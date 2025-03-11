import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Popconfirm, Radio, Table } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router';
import PageHeading from '../../Components/Shared/PageHeading';
import { useGetProductQuery } from '../../Redux/services/ProductApis';
import { imageUrl } from '../../Utils/server';

const TABS = [
  { key: 'whole_sale', label: 'Whole Sale', value: true },
  { key: 'only_user', label: 'Only User', value: false },
];

const ManageOrder = () => {
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(TABS[0].key);
  const [searchKey, setSearchKey] = useState('');

  const isWholeSale = TABS.find((tab) => tab.key === currentTab)?.value;

  const { data: products, isLoading: productsLoading } = useGetProductQuery({
    whole_sale: isWholeSale,
    search: searchKey,
  });

  const transformedData =
    products?.data?.map((product) => ({
      id: product._id,
      productName: product.name,
      category: product.description,
      price: `$ ${product.price}`,
      image: product.variantImages[product.variantColors[0]]?.[0] || '',
    })) || [];

  const filteredData = transformedData.filter((item) =>
    searchKey
      ? item.productName.toLowerCase().includes(searchKey.toLowerCase())
      : true
  );

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setPage(1);
  };

  const handleDelete = (id) => {
    console.log('Deleting product with id:', id);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Products Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={imageUrl(record.image)}
            alt={record.productName}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '5px',
              objectFit: 'cover',
            }}
          />
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center">
          <Button shape="circle">
            <FaEdit className="text-blue-500 cursor-pointer mr-2" />
          </Button>

          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description="Are you sure you want to delete this Product?"
            onConfirm={() => handleDelete(record.id)}
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
        <Link to={'/add-product'}>
          <Button
            style={{
              maxWidth: '220px',
              justifyContent: 'center',
              height: '44px',
            }}
          >
            Add New Product <FaPlus />
          </Button>
        </Link>
      </div>
      <div className="p-2 rounded">
        <div className="start-center mb-3">
          {TABS.map((tab) => (
            <Radio
              onChange={() => handleTabChange(tab.key)}
              className="text-[var(--white-600)]"
              checked={tab.key === currentTab}
              value={tab.key}
              key={tab.key}
            >
              {tab.label}
            </Radio>
          ))}
        </div>
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{
            pageSize: 10,
            current: page,
            total: filteredData.length,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
          }}
          loading={productsLoading}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default ManageOrder;
