import React from 'react';
import { Form, Button, Typography, Input } from 'antd';
import 'antd/dist/reset.css';
import { EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../Redux/services/authApis';
import toast from 'react-hot-toast';

const { Title } = Typography;

const ResetPassword = () => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const route = useNavigate();
  const onFinish = async (values) => {


    try {
      if (values.password !== values.confirmPassword) {
        return Promise.reject(new Error('Passwords do not match!'));
      }
      const data = {
        password: values?.password,
        confirm_password: values?.confirmPassword,
      };
      const res = await resetPassword({ data }).unwrap();
      if (res?.success) {
        toast.success('Password reset successfully');
        route('/login');
      } else {
        toast.error('Password reset failed');
      }
      np;
    } catch (error) {
      console.error('Reset Password Error:', error);
      toast.error(
        error?.data?.message || error?.message || 'An unexpected error occurred'
      );
    }
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#3872F0] p-4">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <Title level={3} className="text-blue-500">
          {/* <Logo /> */}
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={3} className="mb-1">
            Create new password
          </Title>
          <h1 className="text-sm text-gray-500">
            To secure your account, please create a new password.
          </h1>
        </div>

        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              {
                min: 8,
                // pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])'),
                message: 'Password must be at least 8 characters',
              },
              //   message:
              //     'Password must be at least 8 characters & contain at least one uppercase letter',
              // },
            ]}
          >
            <Input.Password
              iconRender={(visible) => (
                <EyeTwoTone twoToneColor={visible ? '#3872F0' : '#3872F0'} />
              )}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              style={{
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                textAlign: 'start',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
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
          >
            <Input.Password
              iconRender={(visible) => (
                <EyeTwoTone twoToneColor={visible ? '#3872F0' : '#3872F0'} />
              )}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              style={{
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                textAlign: 'start',
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[#3872F0]"
            style={{ marginTop: 10 }}
          >
            Confirm
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
