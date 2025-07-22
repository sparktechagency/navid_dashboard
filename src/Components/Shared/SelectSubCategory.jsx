import { Form, Select } from 'antd';
import React from 'react';
import { useGetSubCategoryQuery } from '../../Redux/services/categoriseApis';

function SelectSubCategory({ subCategory, setSubCategoryId, categoryId }) {
  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetSubCategoryQuery({ id: categoryId });

  const handleSubCategoryChange = (value) => {
    setSubCategoryId(value);
  };

  const options = subCategoryData?.data?.map((subCategory) => ({
    value: subCategory._id,
    label: subCategory.name,
  }));

  return (
    <div>
      <Form.Item
        label="Select a subcategory"
        name={subCategory}
        rules={[{ required: true, message: 'Please select a subcategory' }]}
      >
        <Select
          placeholder="Select a subcategory"
          loading={subCategoryLoading}
          onChange={(value) => handleSubCategoryChange(value)}
          options={options}
        ></Select>
      </Form.Item>
    </div>
  );
}

export default SelectSubCategory;
