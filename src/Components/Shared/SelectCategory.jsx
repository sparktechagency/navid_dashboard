import { Form, Select } from 'antd';
import React from 'react';
import { useGetCategoryQuery } from '../../Redux/services/categoriseApis';

function SelectCategory({ category, setCategoryId }) {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery({});
  const handleCategoryChange = (value) => {
    setCategoryId(value);
  };

  const options = categoryData?.data?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return (
    <div>
      <Form.Item
        label="Select a category"
        name={category}
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select
          placeholder="Select a category"
          loading={categoryLoading}
          onChange={(value) => handleCategoryChange(value)}
          options={options}
        ></Select>
      </Form.Item>
    </div>
  );
}

export default SelectCategory;
