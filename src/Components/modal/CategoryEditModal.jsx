import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { FaImage } from "react-icons/fa";
import { imageUrl } from "../../Utils/server";

const CategoryEditModal = ({ visible, onCancel, initialData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    form.setFieldsValue(initialData);

    if (initialData?.image) {
      setFileList([
        {
          uid: "-1",
          name: "existing image",
          status: "done",
          url: imageUrl(initialData.image),
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [initialData, form]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setFile(fileList.length ? fileList[0].originFileObj : null);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (file) {
      formData.append("image", file);
    }

    console.log("FormData Entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setFileList([]);
    onCancel();
  };

  return (
    <Modal
      title="Edit Category"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form
        requiredMark={false}
        form={form}
        initialValues={initialData}
        onFinish={onFinish}
      >
        <Form.Item
          label={<span>Category Image</span>}
          rules={[
            { required: true, message: "Please upload a category image" },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            fileList={fileList}
            onRemove={() => setFileList([])}
          >
            {fileList.length < 1 && (
              <div className="center-center flex-col">
                <FaImage className="" />
                <p>Upload Image</p>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryEditModal;
