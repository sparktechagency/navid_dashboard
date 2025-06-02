import React, { useState } from 'react';
import { Button, Form, Input, Popconfirm, Radio, Table } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';
import PageHeading from '../../Components/Shared/PageHeading';
import {
  useDeleteProductsMutation,
  useGetProductQuery,
} from '../../Redux/services/ProductApis';
import { imageUrl } from '../../Utils/server';
import toast from 'react-hot-toast';

const TABS = [
  { key: 'whole_sale', label: 'Whole Sale', value: true },
  { key: 'only_user', label: 'Only User', value: false },
];

const ManageProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(TABS[0].key);
  const [searchKey, setSearchKey] = useState('');

  const isWholeSale = TABS.find((tab) => tab.key === currentTab)?.value;
  const navigate = useNavigate();
  const { data: products, isLoading: productsLoading } = useGetProductQuery({
    whole_sale: isWholeSale,
    search: searchKey,
    page: currentPage,
  });

  const [deleteProducts] = useDeleteProductsMutation();

  const transformedData =
    products?.data?.map((product) => ({
      id: product?._id,
      productName: product?.name,
      description: product?.description,
      price: new Intl.NumberFormat('en-US').format(product?.price),
      whole_sale: product?.whole_sale,
      quantity: product?.quantity,
      categoryId: product?.category?._id,
      category: product?.category?.name,
      variantImages: product?.variantImages || [],
      image: product?.banner || [],
      video: product?.variantImages?.video || [],
    })) || [];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProducts({ id });
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Product deleted successfully.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Product deletion failed.');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={imageUrl(record?.image[0])}
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
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center">
          <Button
            onClick={() => {
              navigate(`/edit-product/${record.id}`, { state: record.id });
            }}
            shape="circle"
          >
            <FaEdit className="text-blue-500 cursor-pointer mr-2" />
          </Button>

          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description="Are you sure you want to delete this product?"
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
        bordered
          dataSource={transformedData}
          columns={columns}
          loading={productsLoading}
           scroll={{ x: 1500 }}
          rowKey="id"
          pagination={{
            current: products?.pagination?.currentPage || 1,
            pageSize: products?.pagination?.itemsPerPage || 10,
            total: products?.pagination?.totalItems || 0,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    </>
  );
};

export default ManageProducts;
