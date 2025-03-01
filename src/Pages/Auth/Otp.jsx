import React, { useState, useRef, useEffect, use } from 'react';
import { Typography, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router';

// import Logo from '../../components/ui/Logo';

const { Title, Text } = Typography;

const Otp = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    console.log('OTP:', otp.join(''));
    router('/reset-password');
  };

  return (
    <div className="flex justify-center  items-center min-h-screen bg-[#3872F0] p-4">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          {/* <Logo /> */}
        </Title>
        <div className="flex items-start flex-col text-start">
          <Title level={3} className="mb-2">
            Reset Password
          </Title>
          <h1 className="text-sm font-extralight text-[var(--text)]">
            We sent a 6-digit OTP to{' '}
            <strong className="text-[#111]">micheal@gmail.com</strong>. Please
            input it below.
          </h1>
        </div>

        <div className="flex justify-center gap-2 my-4">
          {otp.map((value, index) => (
            <Input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="text-center text-xl w-12 h-12 border-2 border-blue-400"
            />
          ))}
        </div>

        <Button
          type="primary"
          className={`w-full ${
            otp.includes('') ? '!bg-[#fafafa]' : '!bg-[#3872F0]'
          }`}
          disabled={otp.includes('')}
          onClick={handleContinue}
        >
          Continue
        </Button>

        <div className="mt-3">
          <h1
            onClick={() => router('/otp')}
            className="text-[#3872F0] cursor-pointer hover:underline"
          >
            Resend OTP
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Otp;
