import { Table, Popconfirm, message, Modal, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import PageHeading from '../../Components/Shared/PageHeading';
import { FaPlus } from 'react-icons/fa6';
import CategoryAddModal from '../../Components/modal/CategoryAddModal';
import CategoryEditModal from '../../Components/modal/CategoryEditModal';
import UsernameImage from '../../Utils/Sideber/UserImage';
import { FaEdit } from 'react-icons/fa';
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from '../../Redux/services/categoriseApis';
import toast from 'react-hot-toast';

const CategoryManage = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({});
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoryQuery({ page: currentPage });

  const [deleteCategory] = useDeleteCategoryMutation({});

  const handleDelete = async (record) => {
    setRecordToDelete(record);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!confirmData?.name || !confirmData?.password) {
      toast.error('Please fill in both name and password.');
      return;
    }
    const data = {
      id: recordToDelete?._id,
      name: confirmData.name,
      password: confirmData.password,
    };
    try {
      const response = await deleteCategory({ data });
      if (response?.data?.success) {
        toast.success('Category deleted successfully.');
      } else {
        console.log(response);
        toast.error(
          response?.error?.data?.message || 'Failed to delete category.'
        );
      }
    } catch (error) {
      toast.error('Failed to delete category.');
    } finally {
      setConfirmModalOpen(false);
      setConfirmData({});
      setRecordToDelete(null);
    }
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModalOpen(true);
  };

  const columns = [
    { title: 'Sl_no', dataIndex: 'sl_no', key: 'sl_no' },
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Category Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <UsernameImage image={image} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="flex items-center">
          <Button shape="circle" onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>
          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description={
              <p className="text-wrap">
                Are you sure you want to delete this category? <br /> This will
                also delete all products under this category.
              </p>
            }
            onConfirm={() => {
              handleDelete(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <MdDelete className="cursor-pointer text-red-500 text-2xl" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Prepare categories data if it's available
  const categories =
    categoriesData?.data?.map((category, index) => ({
      sl_no: `# ${index + 1 + (currentPage - 1)}`,
      name: category.name,
      image: category.img,
      _id: category?._id,
    })) || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <PageHeading text="Category" />
        <div className="end-center">
          <Button
            onClick={() => setCategoryModalOpen(true)}
            style={{
              maxWidth: '220px',
              justifyContent: 'center',
              height: '44px',
            }}
          >
            Add New Category <FaPlus />
          </Button>
        </div>
      </div>
      <Table
        loading={categoriesLoading}
        columns={columns}
        dataSource={categories}
        bordered
        rowKey="_id"
        pagination={{
          current: categoriesData?.pagination?.currentPage || 1,
          pageSize: categoriesData?.pagination?.limit || 10,
          total: categoriesData?.pagination?.totalItems || 0,
          onChange: (page) => setCurrentPage(page),
        }}
        // onChange={handleTableChange}
      />
      <Modal
        className="addcategory"
        open={categoryModalOpen}
        onCancel={() => setCategoryModalOpen(false)}
        footer={false}
        centered
      >
        <CategoryAddModal closeModal={() => setCategoryModalOpen(false)} />
      </Modal>
      <CategoryEditModal
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        initialData={selectedCategory}
      />
      <Modal
        open={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setConfirmModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmDelete}>
            Confirm
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={confirmData.name}
              onChange={(e) =>
                setConfirmData({ ...confirmData, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              value={confirmData.password}
              onChange={(e) =>
                setConfirmData({ ...confirmData, password: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManage;
