import React from 'react';
import { Form, Button, Upload } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

const ProductVideoUpload = ({ videoFile, setVideoFile, form }) => {
  const handleVideoChange = (info) => {
    setVideoFile(info.file);
    form.setFieldValue("variants_video", info.file);
  };

  return (
    <div>
      {videoFile ? (
        <div>
          <video
            src={URL.createObjectURL(videoFile)}
            controls
            className="w-full"
          />
          <Button
            onClick={() => {
              setVideoFile(null);
              form.setFieldValue("variants_video", null);
            }}
            className="!mt-2 !mb-1 !bg-red-500 !text-white"
          >
            Remove Video
          </Button>
        </div>
      ) : (
        <Form.Item label="Upload Product Video" name="variants_video">
          <Upload
            listType="picture-card"
            file={videoFile}
            onChange={handleVideoChange}
            beforeUpload={() => false}
            accept="video/*"
            maxCount={1}
          >
            <div>
              <VideoCameraOutlined />
              <div className="mt-2 text-sm">Browse Video</div>
            </div>
          </Upload>
        </Form.Item>
      )}
    </div>
  );
};

export default ProductVideoUpload;
