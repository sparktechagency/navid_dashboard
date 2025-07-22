import React, { useState } from 'react';
import { Button, Select, InputNumber, Upload, Tag, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { colorOptions } from '../../Pages/Dashboard/color';

const ProductVariant = ({
  variant,
  index,
  handleVariantChange,
  handleVariantImageChange,
  handleVariantQuantityChange,
  removeVariant,
}) => {
  const availableSizes = ['SMALL', 'MEDIUM', 'LARGE', '30MM', '40MM'];
  const [selectedSizes, setSelectedSizes] = useState([]);
  const handleSizeTagClick = (size) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((s) => s !== size)
        : [...prevSelected, size]
    );
  };
  return (
    <Tag color='blue' key={index} className='!p-2'>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">Variant {index + 1}</h4>
        <Button
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => removeVariant(index)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-sm">Color</label>
          <Select
            placeholder="Select color"
            value={variant.color}
            onChange={(value) => handleVariantChange(index, 'color', value)}
            className="!w-full"
          >
            {colorOptions.map((color) => (
              <Select.Option className='!flex !items-center !justify-between !p-2 !mb-3' key={color.value} value={color.value}>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: color.color }}
                  />
                  {color.label}
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Quantity</label>
          <InputNumber
            min={1}
            value={variant.quantity}
            onChange={(value) => handleVariantQuantityChange(value, index)}
            className="!w-full"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="block mb-1 text-sm">Image</label>
        {variant.image ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(variant.image)}
              alt={`Variant ${index + 1}`}
              className="w-full h-24 object-contain border rounded !mb-1"
            />
            <Button
              size="small"
              danger
              className="absolute top-1 !mb-1 right-1"
              onClick={() => handleVariantChange(index, 'image', null)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            accept="image/*"
            onChange={(info) => handleVariantImageChange(info, index)}
          >
            <div>
              <PlusOutlined />
              <div className="mt-2">Upload</div>
            </div>
          </Upload>
        )}
      </div>
      <div className="bg-gray-100 mt-3 border border-gray-200 p-6 rounded-xl shadow-sm">
        <div className="grid grid-cols-5 gap-2" >
          {availableSizes.map((size) => (
            <Tag.CheckableTag
              key={size}
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeTagClick(size)}
            >
              {size}
            </Tag.CheckableTag>
          ))}
        </div>
      </div>
    </Tag>
  );
};

export default ProductVariant;
