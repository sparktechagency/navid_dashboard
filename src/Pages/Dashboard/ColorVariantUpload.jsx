import React from 'react';
import { Upload, Button, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const ColorVariantUpload = ({
  colorOptions,
  colorImagePreviews,
  productData,
  handleColorImageChange,
  removeColorImage,
  showPreview,
}) => {

  return (
    <div>
      <label className="block mb-2 font-medium">Product Color Variants</label>
      <p className="text-sm text-gray-500 mb-3">
        Add images for each color variant
      </p>

      <div className="grid grid-cols-3 gap-2">
        {colorOptions.map((item) => {
          const fieldName = `variants_${item?.value}`;
          const hasImage = !!colorImagePreviews[fieldName];
          const isExistingVariant = productData?.data?.variantColors?.includes(
            item.value
          );

          return (
            <Tooltip
              title={`${item.label} variant ${
                isExistingVariant ? '(existing)' : ''
              }`}
              key={item.value}
            >
              <div className="text-center">
                <div
                  className={`w-full h-8 ${item.color} rounded mb-1 ${
                    isExistingVariant ? 'ring-2 ring-blue-500' : ''
                  }`}
                ></div>

                {hasImage ? (
                  <div className="mt-2 relative border border-gray-200 rounded p-1">
                    <img
                      src={colorImagePreviews[fieldName]}
                      alt={`${item.label} variant`}
                      className="w-full h-16 object-contain rounded cursor-pointer"
                      onClick={() =>
                        showPreview(
                          'image',
                          colorImagePreviews[fieldName],
                          `${item.label} Variant`
                        )
                      }
                    />
                    <div className="absolute top-1 right-1 flex gap-1">
                    
                      <Button
                        size="small"
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        className="flex items-center justify-center h-6 w-6 rounded-full bg-white/70"
                        onClick={() => removeColorImage(item.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <Upload
                    id={`upload-${item.value}`}
                    listType="picture"
                    showUploadList={false}
                    onChange={(info) =>
                      handleColorImageChange(info, item.value)
                    }
                    beforeUpload={() => false}
                    accept="image/*"
                  >
                    <Button
                      icon={<PlusOutlined />}
                      size="small"
                      className="w-full"
                    >
                      Add
                    </Button>
                  </Upload>
                )}
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ColorVariantUpload;
