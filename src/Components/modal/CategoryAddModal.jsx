import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useCreateNewCategoryMutation } from '../../Redux/services/categoriseApis';
import toast from 'react-hot-toast';

const CategoryAddModal = ({ closeModal }) => {
  const [createNewCategory, { isCreating }] = useCreateNewCategoryMutation();
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
    if (!image) {
      message.error('Please upload a category image');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);

    if (image) {
      formData.append('img', image);
    } else {
      message.error('Image is not correctly selected.');
      return;
    }

    try {
      const response = await createNewCategory(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message || 'Category added successfully.');
        form.resetFields();
        setFile([]);
        setImage(null);
        closeModal();
      } else {
        toast.error(
          response?.message || 'Failed to add category. Please try again.'
        );
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || 'Failed to add category. Please try again.');
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
        rules={[{ required: true, message: 'Please input category name' }]}
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

      <div className="center-center mt-10 flex justify-between gap-4">
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
          {isCreating ? 'Adding...' : 'Add Category'}
        </Button>
      </div>
    </Form>
  );
};

export default CategoryAddModal;
