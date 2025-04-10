import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { useCreateNewPickupAddressMutation } from '../../Redux/services/addressApis';
import toast from 'react-hot-toast';

const CreatePickUpModal = ({ closeModal }) => {
  const [createNewAddress, { isLoading }] = useCreateNewPickupAddressMutation();
  const initialData = {
    name: '',
    address: '',
    phone: '',
  };
  const handleSubmit = async (value) => {
    const data = {
      name: value?.name,
      address: value?.address,
      phone: value?.phone,
    };
    try {
      const res = await createNewAddress({ data });
      if (res?.data?.success) {
        toast.success(
          res?.data?.message || 'pick up address created successfully'
        );
        closeModal();
      } else {
        toast.error(
          res?.data?.message || 'Please check if the name already exists'
        );
      }
    } catch (error) {
      console.error(error?.data?.message);
    }
  };
  return (
    <Form
      initialValues={initialData}
      requiredMark={false}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the name!' }]}
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please enter the Address!' }]}
      >
        <Input placeholder="Address" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please enter the Phone!' }]}
      >
        <Input placeholder="Enter Phone" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {isLoading ? <Spin size="small" /> : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePickUpModal;
