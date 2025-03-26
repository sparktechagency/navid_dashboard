import React, { useEffect, useState } from 'react';
import { Button, notification, Spin } from 'antd';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import JoditComponent from '../../Components/Shared/JoditComponent.jsx';
import {
  useGetPolicyQuery,
  useUpdateSettingMutation,
} from '../../Redux/services/policyApis.js';
import toast from 'react-hot-toast';

const TermsCondition = () => {
  const [content, setContent] = useState('');
  const { data, isLoading } = useGetPolicyQuery({ type: 'terms' });
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
        name: 'terms',
        desc: content,
      };

      const res = await updateSetting({ data: requestData }).unwrap();

      toast.success(res.message || 'Terms & Conditions updated successfully!');
    } catch (error) {
      toast.error(
        error?.message ||
          'Failed to update Terms & Conditions. Please try again.'
      );
    }
  };

  if (isLoading) {
    return <span className="loader-black"></span>;
  }

  return (
    <>
      <PageHeading text="Terms & Conditions" />
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

export default TermsCondition;
