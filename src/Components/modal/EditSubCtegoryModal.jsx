import React, { useState } from "react";
import { Form, Input, Button, Modal, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditSubCtegoryModal = ({ subCategory, closeModal }) => {
  const [imageUrl, setImageUrl] = useState(subCategory?.image || null);

  const handleImageUpload = (file) => {
    // Handle image upload logic here
    setImageUrl(URL.createObjectURL(file)); // For demo purposes
    return false; // Prevent automatic upload
  };

  const handleSubmit = (values) => {
    console.log("Form Values: ", values);
    const data = {
      name: values?.categoryName,
      image: values.subCategoryImage?.file,
      subName: values?.subCategoryName,
    };
    console.log("Image URL: ", data);
    // You can do additional operations here, such as calling an API

    message.success("Subcategory updated successfully!");
    closeModal(); // Close modal after submission
  };

  return (
    <Form
      requiredMark={false}
      layout="vertical"
      initialValues={{
        subCategoryName: subCategory?.sub_category,
        categoryName: subCategory?.category_name,
      }}
      onFinish={handleSubmit} // Handle form submission
    >
      {/* Category Dropdown */}
      <Form.Item label="Select Category" name="categoryName">
        <Select defaultValue={subCategory?.category_name}>
          <Select.Option value="Food">Food</Select.Option>
          <Select.Option value="Fashion">Fashion</Select.Option>
          {/* Add other categories here */}
        </Select>
      </Form.Item>

      {/* Subcategory Image Upload */}
      <Form.Item label="Subcategory Image" name="subCategoryImage">
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={handleImageUpload}
        >
          <div className="!w-[450px] h-[200px] rounded-md border-dashed border-[1px] border-gray-300 flex justify-center items-center p-5">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="subcategory"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  maxWidth: "150px",
                  maxHeight: "150px",
                }}
              />
            ) : (
              <Button icon={<UploadOutlined />}>Browse Image</Button>
            )}
          </div>
        </Upload>
      </Form.Item>

      {/* Subcategory Name Input */}
      <Form.Item
        label="Subcategory Name"
        name="subCategoryName"
        rules={[
          { required: true, message: "Please enter the subcategory name!" },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditSubCtegoryModal;
