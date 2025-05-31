import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { Link } from 'react-router';
import { useLoginPostMutation } from '../../Redux/services/authApis';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;
const Login = () => {
  const [setLogin, { data, isLoading }] = useLoginPostMutation();
  const onFinish = async ({ email, password }) => {
    try {
      await setLogin({ data: { email, password } })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            localStorage.setItem('token', res?.token);
            toast.success(res?.message || 'Login successful');
            window.location.href = '/';
          } else {
            toast.error(res?.message || 'Login failed. Please try again.');
          }
        });
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || 'An unexpected error occurred'
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#3872F0] p-4">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          {/* <Logo /> */}
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={3} className="mb-1">
            Welcome back,
          </Title>
          <Text type="secondary">Sign in to your account to continue</Text>
        </div>

        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email address!' },
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input
              placeholder="MichealScott@gmail.com"
              type="email"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input.Password
              iconRender={(visible) => (
                <EyeTwoTone twoToneColor={visible ? '#3872F0' : '#3872F0'} />
              )}
              placeholder="Password"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <div className="flex items-center justify-end">
            <Link
              to="/forget-password"
              className="!text-[#3872F0] hover:!underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[#3872F0]"
            style={{ marginTop: 10 }}
          >
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              'Continue with Email'
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
