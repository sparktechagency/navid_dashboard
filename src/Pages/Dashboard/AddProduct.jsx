import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Upload,
  message,
  Row,
  Col,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PageHeading from '../../Components/Shared/PageHeading';

const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [tab, setTab] = useState('Wholesaler');
  const [fileList, setFileList] = useState(null);

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const onFinish = (values) => {
    console.log('Form Values:', values);
    message.success('Product added successfully!');
    form.resetFields();
    setFileList([]);
  };

  return (
    <div className="bg-white min-h-full p-6 rounded-xl">
      <PageHeading text={'Manage Products'} />
      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          price: '$100',
          category: 'Foods',
          quantity: '500-600gm',
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Product Image Upload */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              label="Upload Product Image"
              name="productImages"
              rules={[
                { required: true, message: 'Please upload product image' },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                accept="image/*"
                maxCount={1}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2 text-sm">Browse Image</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          {/* Product Details */}
          <Col xs={24} sm={12} md={12} lg={16}>
            {/* Tab Selection */}
            <Form.Item label="Publish Products For" name="publishFor">
              <Radio.Group onChange={(e) => setTab(e.target.value)} value={tab}>
                <Radio value="Wholesaler">Wholesaler</Radio>
                <Radio value="Only User">Only User</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please enter a product description',
                },
              ]}
            >
              <TextArea rows={8} placeholder="Write here...." />
            </Form.Item>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: 'Please enter the price' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item label="Select Category" name="category">
                  <Select
                    rules={[
                      { required: true, message: 'Please select a category' },
                    ]}
                  >
                    <Select.Option value="Foods">Foods</Select.Option>
                    <Select.Option value="Clothing">Clothing</Select.Option>
                    <Select.Option value="Electronics">
                      Electronics
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    { required: true, message: 'Please enter the quantity' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item label="Select Available Color" name="color">
                  <Select
                    placeholder="Select a color"
                    rules={[
                      { required: true, message: 'Please select a color' },
                    ]}
                  >
                    <Select.Option value="Red">Red</Select.Option>
                    <Select.Option value="Green">Green</Select.Option>
                    <Select.Option value="Blue">Blue</Select.Option>
                    <Select.Option value="Yellow">Yellow</Select.Option>
                    <Select.Option value="Purple">Purple</Select.Option>
                    <Select.Option value="Orange">Orange</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="flex justify-between space-x-2">
              <Button
                type="default"
                className="w-full"
                onClick={() => form.resetFields()}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="w-full">
                Publish
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
