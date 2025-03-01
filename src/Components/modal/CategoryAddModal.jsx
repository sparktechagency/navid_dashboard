import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const CategoryAddModal = ({ closeModal }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setImage(fileList[0].originFileObj);
    }

    setFile(fileList);
  };

  const onFinish = async (values) => {
    console.log("Form data:", values);
    console.log("Image file:", image);
    console.log({
      name: values.name,
      image: image,
    });

    if (!image) {
      message.error("Please upload a category image");
      return;
    }

    const formData = new FormData();
    formData.append("categoryname", values.name);
    if (image) {
      formData.append("image", image);
    } else {
      message.error("Image is not correctly selected.");
      return;
    }

    console.log("FormData:", formData);

    try {
      // Assuming the API call or mutation is here
      // await setNewData(formData).unwrap();

      message.success("Category added successfully");
      form.resetFields();
      setFile([]);
      setImage(null);
      closeModal();
    } catch (error) {
      message.error("Failed to add category. Please try again.");
    }
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="bg-[var(--black-200)] p-3 rounded-md"
    >
      <p className="text-xl text-[var(--white-600)] text-center">
        Add New Category
      </p>

      <Form.Item
        label={<span className="text-[var(--white-600)]">Category Name</span>}
        name="name"
        rules={[{ required: true, message: "Please input category name" }]}
      >
        <Input className="bg-[var(--black-600)] p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]" />
      </Form.Item>

      <Form.Item label="Upload Image" className="col-span-2">
        <Upload
          listType="picture-card"
          fileList={file?.slice(0, 1) || []}
          beforeUpload={() => false}
          onChange={handleFileChange}
          maxCount={1}
        >
          <div className="flex items-center flex-col">
            <UploadOutlined />
            <p className="text-[var(--white-600)]">Upload Image</p>
          </div>
        </Upload>
      </Form.Item>

      <div className="center-center mt-10 flex justify-between">
        <Button
          onClick={() => {
            closeModal();
            form.resetFields();
            setFile([]);
            setImage(null);
          }}
          className="border border-[var(--gray-600)] text-[var(--orange-600)]"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-[var(--orange-600)] border-none text-[var(--white-600)]"
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CategoryAddModal;
