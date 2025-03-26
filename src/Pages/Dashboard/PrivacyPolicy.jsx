import React, { useEffect, useState } from 'react';
import { Button, notification, Spin } from 'antd';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import JoditComponent from '../../Components/Shared/JoditComponent.jsx';
import {
  useGetPolicyQuery,
  useUpdateSettingMutation,
} from '../../Redux/services/policyApis.js';
import toast from 'react-hot-toast';

const PrivacyPolicy = () => {
  const [content, setContent] = useState('');
  const { data, isLoading } = useGetPolicyQuery({ type: 'privacy-policy' });
  const [updateSetting, { isLoading: isSubmitting }] =
    useUpdateSettingMutation();

  useEffect(() => {
    if (data?.data?.desc) {
      setContent(data?.data?.desc);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const requestData = {
        name: 'privacy-policy',
        desc: content,
      };

      const res = await updateSetting({ data: requestData }).unwrap();
      console.log(res);
      toast.success(res?.message || 'Privacy Policy updated successfully!');
    } catch (error) {
      toast.error(
        error?.message || 'Failed to update Privacy Policy. Please try again.'
      );
    }
  };

  if (isLoading) {
    return <span className="loader-black"></span>;
  }

  return (
    <>
      <PageHeading text="Privacy Policy" />
      <JoditComponent setContent={setContent} content={content || ''} />
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
        className="w-48 sidebar-button-black"
      >
        {isSubmitting ? <Spin size="small" /> : 'Submit'}
      </Button>
    </>
  );
};

export default PrivacyPolicy;
