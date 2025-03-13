import React, { useState } from 'react';
import { Upload, Button, Tooltip } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

const VideoUploader = ({ onChange }) => {
  const [videoFile, setVideoFile] = useState(null);

  const handleVideoChange = (info) => {
    const file = info.file;
    setVideoFile(file);

    // Pass the file back to the parent component using the onChange prop
    onChange(file);
  };

  return (
    <div>
      <Upload
        listType="picture-card"
        file={videoFile}
        onChange={handleVideoChange}
        beforeUpload={() => false} // Prevent upload from going to server
        accept="video/*"
        maxCount={1}
      >
        <Tooltip title="Upload Product Video">
          <div>
            <VideoCameraOutlined />
            <div className="mt-2 text-sm">Browse Video</div>
          </div>
        </Tooltip>
      </Upload>
    </div>
  );
};

export default VideoUploader;
