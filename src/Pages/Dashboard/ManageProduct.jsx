import React, { useState } from 'react';
import { Button, Form, Input, Popconfirm, Radio, Table, Modal, Descriptions, Image, Tabs, Divider } from 'antd';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isWholeSale = TABS.find((tab) => tab.key === currentTab)?.value;
  const navigate = useNavigate();
  const { data: products, isLoading: productsLoading } = useGetProductQuery({
    whole_sale: isWholeSale,
    search: searchKey,
    page: currentPage,
  });

  console.log(products)

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
      categoryImage: product?.category?.img,
      variantImages: product?.variantImages || [],
      image: product?.banner || [],
      video: product?.variantImages?.video || [],
    })) || [];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setPage(1);
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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
        <div className="flex items-center gap-2">
          <Button
            onClick={() => showProductDetails(record)}
            shape="circle"
            icon={<FaInfoCircle className="text-green-500" />}
            title="View Details"
          />
          <Button
            onClick={() => {
              navigate(`/edit-product/${record.id}`, { state: record.id });
            }}
            shape="circle"
            icon={<FaEdit className="text-blue-500" />}
            title="Edit Product"
          />
          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              shape="circle"
              icon={<MdDelete className="text-red-500" />}
              title="Delete Product"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
console.log(selectedProduct)
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

      <Modal
        title="Product Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
        width={800}
      >
        {selectedProduct && (
          <div className="p-4">
            <div className="mb-6">
              <div>
                <div>
                  <Divider>Basic Information</Divider>
                  <Descriptions column={1} bordered size="small" className="mt-2">
                    <Descriptions.Item label="ID">{selectedProduct?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{selectedProduct?.productName}</Descriptions.Item>
                    <Descriptions.Item label="Description">
                      {selectedProduct?.description || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Price">${selectedProduct?.price}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{selectedProduct?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Category">
                      <div className='flex items-center gap-2'><Image className="!w-10 !rounded-full !h-10" src={imageUrl(selectedProduct?.categoryImage)} /> {selectedProduct?.category}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Wholesale">
                      {selectedProduct?.whole_sale ? 'Yes' : 'No'}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Product Gallery</h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedProduct?.banner?.map((img, idx) => (
                      <Image
                        key={idx}
                        src={imageUrl(img)}
                        alt={`Product image ${idx + 1}`}
                        className="!rounded-md !object-cover !h-32 !w-32"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
                  {selectedProduct?.variantImages && Object.keys(selectedProduct.variantImages).length > 0 ? (
                    <Tabs 
                      defaultActiveKey={Object.keys(selectedProduct.variantImages)[0]}
                      type="line"
                      items={Object.entries(selectedProduct.variantImages).map(([color, variant]) => ({
                        key: color,
                        label: (
                          <div className="flex items-center gap-2">
                            {color !== 'video' && (
                              <div 
                                className="w-4 h-4 rounded-full border" 
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            )}
                            <span className="capitalize">{color}</span>
                          </div>
                        ),
                        children: (
                          <div className="p-4 border-t-0 border-l border-r border-b border-gray-200 rounded-b-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="text-sm font-medium text-gray-600 mb-2">
                                  {color === 'video' ? 'Videos' : 'Images'}
                                </h5>
                                <div className={`flex ${color === 'video' ? 'flex-col' : 'flex-wrap'} gap-4`}>
                                  {variant?.img?.map((media, idx) => (
                                    color === 'video' ? (
                                      <div key={idx} className="w-full">
                                        <video 
                                          controls 
                                          className="w-full max-w-md rounded-md"
                                          style={{ maxHeight: '300px' }}
                                        >
                                          <source src={imageUrl(media)} type="video/mp4" />
                                          Your browser does not support the video tag.
                                        </video>
                                      </div>
                                    ) : (
                                      <Image
                                        key={idx}
                                        src={imageUrl(media)}
                                        alt={`${color} variant ${idx + 1}`}
                                        className="!rounded-md !object-cover !h-24 !w-24"
                                      />
                                    )
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-600 mb-2">Details</h5>
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    <span className="font-medium">Sizes:</span> {variant?.size?.join(', ') || 'N/A'}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Quantity:</span> {variant?.quantity || 0}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }))}
                    />
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No product variants found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ManageProducts;
