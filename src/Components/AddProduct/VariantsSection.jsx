import React from 'react';
import { Button, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductVariant from './ProductVariant';

const VariantsSection = ({
  colorVariants,
  handleAddVariant,
  handleVariantChange,
  handleVariantImageChange,
  handleVariantQuantityChange,
  removeVariant,
}) => {
  return (
    <div className="mt-4 w-full">
      <Tag color='blue' className='!flex !items-center !justify-between !p-2 !mb-3'>
        <label className="block font-medium">Product Variants</label>
        <Button
          type="dashed"
          onClick={handleAddVariant}
          icon={<PlusOutlined />}
        >
          Add Variant
        </Button>
      </Tag>

      <div className='!grid !grid-cols-3 !p-2 !mb-3'>
        {colorVariants.map((variant, index) => (
          <ProductVariant
            key={index}
            variant={variant}
            index={index}
            handleVariantChange={handleVariantChange}
            handleVariantImageChange={handleVariantImageChange}
            handleVariantQuantityChange={handleVariantQuantityChange}
            removeVariant={removeVariant}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantsSection;
