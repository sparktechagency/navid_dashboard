import { Table, Popconfirm, message, Modal, Button, Select, Input } from "antd";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import CategoryAddModal from "../../Components/modal/CategoryAddModal";
import AddSubCategoryModal from "../../Components/modal/AddSubCategoryModal";
import EditSubCtegoryModal from "../../Components/modal/EditSubCtegoryModal";

const SubcategoryManagement = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Step 1: State to store selected subcategory
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([
    {
      sl_no: 1,
      name: "Electronics",
      sub_category: "Mobiles",
      image:
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      category_name: "Gadgets",
      _id: "1",
    },
    {
      sl_no: 2,
      name: "Fashion",
      sub_category: "Clothing",
      image:
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      category_name: "Apparel",
      _id: "2",
    },
    {
      sl_no: 3,
      name: "Home Appliances",
      sub_category: "Kitchen",
      image:
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      category_name: "Home",
      _id: "3",
    },
  ]);

  const handleDelete = (id) => {
    message.success("Category deleted successfully.");
    setCategories(categories.filter((category) => category._id !== id));
  };

  // Step 2: Set the selected subcategory for editing
  const handleEdit = (record) => {
    setSelectedSubCategory(record); // Store selected subcategory
    setEditModalOpen(true); // Open the edit modal
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "sl_no",
      key: "sl_no",
      render: (sl_no) => <p>#{sl_no}</p>,
    },
    {
      title: "Subcategory Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="subcategory"
          className="h-12 w-12 object-cover rounded-md"
        />
      ),
    },
    {
      title: "Subcategory Name",
      dataIndex: "sub_category",
      key: "sub_category",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Action",
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
        <PageHeading text="Manage Sub Category " />
      </div>
      <div className="flex mb-3 justify-between items-center">
        <div>
          <Select
            defaultValue="Category"
            style={{ width: 150, marginRight: 10 }}
          >
            <Select.Option value="Fruits">Fruits</Select.Option>
            <Select.Option value="Vegetables">Vegetables</Select.Option>
          </Select>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200, marginRight: 10 }}
          />
        </div>
        <Button
          onClick={() => setCategoryModalOpen(true)}
          style={{
            maxWidth: "220px",
            justifyContent: "center",
            height: "44px",
          }}
          icon={<FaPlus />}
        >
          Add New Sub Category
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} rowKey="_id" />
      <Modal
        title="Add Sub Categories"
        open={categoryModalOpen}
        onCancel={() => setCategoryModalOpen(false)}
        footer={false}
        centered
      >
        <AddSubCategoryModal closeModal={() => setCategoryModalOpen(false)} />
      </Modal>
      {/* Step 3: Pass selected subcategory as prop to the Edit Modal */}
      <Modal
        title="Edit category"
        className="addcategory"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={false}
        centered
      >
        <EditSubCtegoryModal
          closeModal={() => setEditModalOpen(false)}
          subCategory={selectedSubCategory} // Pass the selected subcategory data
        />
      </Modal>
    </div>
  );
};

export default SubcategoryManagement;
