import React from 'react';
import { Button, Form, message, Spin } from 'antd';
import { useUpdateProfileDataMutation } from '../../Redux/services/profileApis';

const ProfileEdit = ({ image, defaultImage, data }) => {
  console.log(defaultImage)
  const [form] = Form.useForm();
  const [setProfileUpdate, { isLoading: isProfileUpdate }] =
    useUpdateProfileDataMutation();
  const onFinish = async (values) => {
    const updateData = {
      name: values?.name,
      phone: values?.phoneNumber,
    };

    const formData = new FormData();
    Object.keys(updateData).forEach((key) => {
      formData.append(key, updateData[key]);
    });

    if (image !== null) {
      formData.append('img', image);
    }

    try {
      await setProfileUpdate(formData);
      message.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div>
      <p className="text-[#3872F0] text-3xl text-center">Edit Profile</p>
      <Form
        className="text-white"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: data.name || '',
          email: data.email || '',
          phoneNumber: data.phone || '',
        }}
      >
        <Form.Item
          name="name"
          label={<span className="text-black">Name</span>}
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <input
            style={{
              width: '100%',
              height: 40,
              border: 'none',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            placeholder="Name"
            className="p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-black">Email</span>}
        >
          <input
            style={{
              width: '100%',
              height: 40,
              border: 'none',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            disabled
            type="email"
            placeholder="Email"
            className="cursor-not-allowed p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={<span className="text-black">Phone Number</span>}
          rules={[{ required: true, message: 'Phone number is required' }]}
        >
          <input
            style={{
              width: '100%',
              height: 40,
              border: 'none',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            placeholder="Phone Number"
            className="p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isProfileUpdate}
          className="!bg-[#3872F0] !hover:bg-[#3872F0] active:bg-[#3872F0] w-full"
        >
          {isProfileUpdate ? <Spin /> : 'Update Profile'}
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
