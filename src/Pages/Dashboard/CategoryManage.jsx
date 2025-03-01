import { Table, Popconfirm, message, Modal, Button } from "antd";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import PageHeading from "../../Components/Shared/PageHeading";
import { FaPlus } from "react-icons/fa6";
import CategoryAddModal from "../../Components/modal/CategoryAddModal";
import CategoryEditModal from "../../Components/modal/CategoryEditModal"; // Import the new modal
import UsernameImage from "../../Utils/Sideber/UserImage";
import { FaEdit } from "react-icons/fa";

const CategoryManage = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dummy data
  const [categories, setCategories] = useState([
    {
      sl_no: `# ${1}`,
      name: "Electronics",
      image:
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      _id: "1",
    },
    {
      sl_no: `# ${2}`,
      name: "Fashion",
      image:
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      _id: "2",
    },
    {
      sl_no: `# ${3}`,
      name: "Home Appliances",
      image:
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      _id: "3",
    },
  ]);

  const handleDelete = (id) => {
    console.log("Deleted Category ID:", id);
    message.success("Category deleted successfully.");
    setCategories(categories.filter((category) => category._id !== id));
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModalOpen(true);
  };

  const columns = [
    { title: "Sl_no", dataIndex: "sl_no", key: "sl_no" },
    { title: "Category Name", dataIndex: "name", key: "name" },
    {
      title: "Category Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <UsernameImage image={image} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex items-center">
          <Button shape="circle" onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>
          <Popconfirm
            placement="topLeft"
            title="Confirm Deletion"
            description="Are you sure you want to delete this category?"
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
        <PageHeading text="Category" />
        {/* Search and add category button */}
        <div className="end-center">
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
        </div>
      </div>
      <Table columns={columns} dataSource={categories} rowKey="_id" />
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
    </div>
  );
};

export default CategoryManage;
