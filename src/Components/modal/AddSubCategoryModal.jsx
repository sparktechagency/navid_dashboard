import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddSubCategoryModal = ({ closeModal }) => {
  const [imageUrl, setImageUrl] = useState(null); // Handle image upload state

  const handleImageUpload = (file) => {
    // Handle image upload logic here
    setImageUrl(URL.createObjectURL(file)); // For demo purposes, display the selected image
    return false; // Prevent automatic upload
  };

  const handleSubmit = (values) => {
    const data = {
      categoryName: values.categoryName,
      image: values?.subCategoryImage?.file,
      subCategoryName: values.subCategoryName,
    };
    console.log("Form Values:this is go with api ", data);

    message.success("Subcategory added successfully!");
    closeModal();
  };

  return (
    <Form
      requiredMark={false}
      layout="vertical"
      onFinish={handleSubmit} // Handle form submission
    >
      {/* Category Dropdown */}
      <Form.Item
        label="Select Category"
        name="categoryName"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select a Category">
          <Select.Option value="Food">Food</Select.Option>
          <Select.Option value="Fashion">Fashion</Select.Option>
          <Select.Option value="Electronics">Electronics</Select.Option>
          <Select.Option value="Health">Health</Select.Option>
          {/* Add other categories here */}
        </Select>
      </Form.Item>

      {/* Subcategory Image Upload */}
      <Form.Item
        className="w-full"
        label="Subcategory Image"
        name="subCategoryImage"
      >
        <Upload
          className="!w-full "
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
              <Button icon={<UploadOutlined />}>Upload Image</Button>
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
        <Input placeholder="Subcategory Name" />
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

export default AddSubCategoryModal;
