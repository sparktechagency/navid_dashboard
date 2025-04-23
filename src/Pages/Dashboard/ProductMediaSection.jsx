import React from 'react';
import ColorVariantUpload from './ColorVariantUpload';
import VideoUpload from './VideoUpload';

const ProductMediaSection = ({
  removeVideo,
  videoFile,
  loadingVideo,
  videoPreview,
  handleVideoChange,
  showPreview,
  colorOptions,
  colorImagePreviews,
  productData,
  handleColorImageChange,
  removeColorImage,
}) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-medium mb-4">Product Media</h3>

      <VideoUpload
        removeVideo={removeVideo}
        videoFile={videoFile}
        loadingVideo={loadingVideo}
        videoPreview={videoPreview}
        handleVideoChange={handleVideoChange}
        showPreview={showPreview}
      />

      <ColorVariantUpload
        colorOptions={colorOptions}
        colorImagePreviews={colorImagePreviews}
        productData={productData}
        handleColorImageChange={handleColorImageChange}
        removeColorImage={removeColorImage}
        showPreview={showPreview}
      />
    </div>
  );
};

export default ProductMediaSection;
