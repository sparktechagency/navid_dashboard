import { Form, Select } from 'antd';
import React from 'react';
import { useGetCategoryQuery } from '../../Redux/services/categoriseApis';

function SelectCategory({ category, setCategoryId }) {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery();

  const handleCategoryChange = (value) => {
    setCategoryId(value);
  };

  return (
    <div>
      <Form.Item
        label="Select a category"
        name={category}
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select
          placeholder="Select a category"
          allowClear
          loading={categoryLoading}
          defaultActiveFirstOption={false}
          onChange={handleCategoryChange}
        >
          {categoryData?.data &&
            categoryData.data.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </div>
  );
}

export default SelectCategory;
