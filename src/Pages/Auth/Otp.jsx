import React, { useState } from 'react';
import { Typography, Input, Button } from 'antd';
import { useNavigate } from 'react-router';
import { useVerifyOtpMutation } from '../../Redux/services/authApis';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

const Otp = () => {
  const router = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [otp, setOtp] = useState('');
  const handleContinue = async () => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        toast.error('Email not found');
        return;
      }
      const data = {
        email,
        code: otp,
      };

      const res = await verifyOtp({ data }).unwrap();

      if (res?.success) {
        console.log(res);
        toast.success('OTP verified successfully');
        localStorage.setItem('resetToken', res?.data?.resetToken);
        router('/reset-password');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      toast.error(
        error?.data?.message || error?.message || 'An unexpected error occurred'
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#3872F0] p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="text-start">
          <Title level={3} className="mb-2">
            Reset Password
          </Title>
          <Text>
            We sent a 6-digit OTP to{' '}
            <strong className="text-[#111]">micheal@gmail.com</strong>. Please
            enter it below.
          </Text>
        </div>

        <div className="flex justify-center my-4">
          <Input.OTP
            length={6}
            value={otp}
            onChange={setOtp}
            className="text-center text-xl w-full"
          />
        </div>

        <Button
          type="primary"
          className="w-full !bg-[#3872F0]"
          disabled={otp.length < 6}
          loading={isLoading}
          onClick={handleContinue}
        >
          Continue
        </Button>

        <div className="mt-3">
          <Text
            onClick={() => router('/otp')}
            className="text-[#3872F0] cursor-pointer hover:underline"
          >
            Resend OTP
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Otp;
