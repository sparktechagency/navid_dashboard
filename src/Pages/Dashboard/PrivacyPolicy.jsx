import React, { useEffect, useState } from 'react';
import { Button, notification, Spin } from 'antd';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import JoditComponent from '../../Components/Shared/JoditComponent.jsx';
import {
  useGetPolicyQuery,
  useUpdateSettingMutation,
} from '../../Redux/services/policyApis.js';

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

      await updateSetting({ data: requestData }).unwrap();

      notification.success({
        message: 'Success',
        description: 'Privacy Policy updated successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update Privacy Policy. Please try again.',
      });
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
