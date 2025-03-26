import React from 'react';
import { Form, Input, Radio, InputNumber, Row, Col, Button } from 'antd';
import SelectCategory from '../../Components/Shared/SelectCategory';

const { TextArea } = Input;

const ProductDetailsSection = ({
  tab,
  setTab,
  productData,
  categoryId,
  setCategoryId,
  isLoading,
  navigate,
}) => {
  return (
    <div className="border !border-gray-100 rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-medium mb-4">Product Details</h3>

      <Form.Item
        rules={[{ required: true, message: 'Please select an option' }]}
        label="Publish Products For"
        name="whole_sale"
      >
        <Radio.Group onChange={(e) => setTab(e.target.value)} value={tab}>
          <Radio value={true}>Wholesaler</Radio>
          <Radio value={false}>Only User</Radio>
        </Radio.Group>
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Please enter product name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber
              placeholder="Enter price"
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity' }]}
          >
            <InputNumber
              placeholder="Enter quantity"
              min={1}
              precision={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <SelectCategory
            setCategoryId={setCategoryId}
            productData={productData}
            category={'category'}
          />
        </Col>
      </Row>

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
        <TextArea rows={8} placeholder="Write product description here..." />
      </Form.Item>

      <div className="flex justify-between gap-4 mt-4">
        <Button
          type="default"
          className="w-full"
          onClick={() => navigate('/manage-products')}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isLoading}
        >
          Update Product
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
