import React from 'react';
import { Upload, Button, Spin } from 'antd';
import { VideoCameraOutlined, EyeOutlined } from '@ant-design/icons';

const VideoUpload = ({ loadingVideo, videoPreview, handleVideoChange, showPreview }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">Product Video</label>

      {loadingVideo ? (
        <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg">
          <Spin />
        </div>
      ) : videoPreview ? (
        <div className="relative">
          <video
            className="w-full h-48 object-cover rounded-lg bg-black"
            src={videoPreview}
            controls
          ></video>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              icon={<EyeOutlined />}
              className="rounded-full"
              onClick={() => showPreview('video', videoPreview, 'Product Video')}
            />
          </div>
        </div>
      ) : (
        <Upload
          listType="picture-card"
          onChange={handleVideoChange}
          beforeUpload={() => false}
          accept="video/*"
          maxCount={1}
          showUploadList={false}
        >
          <div className="text-center p-4">
            <VideoCameraOutlined className="text-3xl text-gray-400" />
            <div className="mt-2 text-sm">Upload Video</div>
          </div>
        </Upload>
      )}
    </div>
  );
};

export default VideoUpload;