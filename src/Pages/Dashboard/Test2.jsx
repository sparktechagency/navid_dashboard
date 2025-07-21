import React, { useState } from 'react';
import {
  Tabs,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Radio,
  Upload,
  Modal,
  Space,
  Tag,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SelectCategory from '../../Components/Shared/SelectCategory';

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);
  const [productForm] = Form.useForm();
  const [variantForm] = Form.useForm();
  const [selectedSizes, setSelectedSizes] = useState([]); // State for selected sizes/dimensions
  const [selectedColor, setSelectedColor] = useState(''); // State for selected color in variant modal
  const [variants, setVariants] = useState([]); // State to store all variants
  const [categoryId, setCategoryId] = useState(null);
  // Handle tab change
  const onTabChange = (key) => {
    setActiveTab(key);
  };

  // Show/Hide Variant Modal
  const showVariantModal = () => {
    setIsVariantModalVisible(true);
  };

  const handleVariantModalOk = () => {
    variantForm.validateFields().then((values) => {
      if (selectedSizes.length === 0) {
        message.warning('Please select at least one size for this variant');
        return;
      }
      
      const newVariant = {
        ...values,
        color: selectedColor,
        sizes: [...selectedSizes], // Store the selected sizes with the variant
        id: Date.now(), // Unique ID for each variant
        date: new Date().toLocaleDateString()
      };
      
      setVariants(prev => [...prev, newVariant]);
      console.log('Variant added:', newVariant);
      setIsVariantModalVisible(false);
      variantForm.resetFields();
      setSelectedColor('');
      setSelectedSizes([]); // Reset selected sizes
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleVariantModalCancel = () => {
    setIsVariantModalVisible(false);
    variantForm.resetFields();
    setSelectedColor('');
    setSelectedSizes([]); // Reset selected sizes when canceling
  };

  // Handle product form submission
  const onProductFinish = (values) => {
    console.log('Product form submitted:', { ...values, selectedSizes });
    // You would typically send this data to your backend
  };

  // Dummy upload function for Ant Design Upload component
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // Handle size/dimension tag selection
  const handleSizeTagClick = (size) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((s) => s !== size)
        : [...prevSelected, size]
    );
  };

  // Options for product category select
  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home_goods', label: 'Home Goods' },
    { value: 'books', label: 'Books' },
  ];

  const colorOptions = [
    { value: 'variants_red', color: '#ff0000', label: 'Red' },
    { value: 'variants_blue', color: '#0000ff', label: 'Blue' },
    { value: 'variants_yellow', color: '#ffff00', label: 'Yellow' },
    { value: 'variants_purple', color: '#800080', label: 'Purple' },
    { value: 'variants_orange', color: '#ffa500', label: 'Orange' },
    { value: 'variants_black', color: '#000000', label: 'Black' },
    {
      value: 'variants_white',
      color: '#ffffff',
      label: 'White',
    },
    { value: 'variants_pink', color: '#ffc0cb', label: 'Pink' },
    { value: 'variants_indigo', color: '#4b0082', label: 'Indigo' },
    { value: 'variants_lightblue', color: '#add8e6', label: 'Light Blue' },
    { value: 'variants_brown', color: '#a52a2a', label: 'Brown' },
    { value: 'variants_gray', color: '#808080', label: 'Gray' },
    { value: 'variants_silver', color: '#c0c0c0', label: 'Silver' },
    { value: 'variants_gold', color: '#ffd700', label: 'Gold' },
    { value: 'variants_darkgreen', color: '#006400', label: 'Dark Green' },
  ]

  // Common sizes/dimensions
  const availableSizes = ['SMALL', 'MEDIUM', 'LARGE', '30MM', '40MM'];

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">
        <Tabs activeKey={activeTab} onChange={onTabChange} centered className="mb-6">
          <Tabs.TabPane tab="Add product" key="1" />
          <Tabs.TabPane tab="All variants" key="2" />
        </Tabs>

        {activeTab === '1' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Add Variants and Video */}
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Add Variants</h3>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showVariantModal}
                  className="w-full py-2.5 text-lg"
                >
                  Add variant
                </Button>
              </div>

              <div className="bg-gray-100 border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Video Upload</h3>
                <Upload accept='video/*' customRequest={dummyRequest} listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />} className="w-full py-2.5 text-lg">
                    Upload Video
                  </Button>
                </Upload>
                <Tag color='blue' className="!mt-2">Max 1 video file</Tag>
              </div>
            </div>

            {/* Right Section: Add Product Form */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Product</h3>
              <Form
                form={productForm}
                requiredMark={false}
                layout="vertical"
                onFinish={onProductFinish}
                initialValues={{ userType: 'wholesaler' }}
              >
                <Form.Item name="userType" className="mb-6">
                  <Radio.Group buttonStyle="solid" className="flex justify-center">
                    <Radio.Button value="wholesaler" className="flex-1 text-center py-2.5 text-base rounded-l-lg">Wholesaler</Radio.Button>
                    <Radio.Button value="onlyUser" className="flex-1 text-center py-2.5 text-base rounded-r-lg">Only User</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[{ required: true, message: 'Please enter product name!' }]}
                >
                  <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: 'Please enter product price!' }]}
                >
                  <InputNumber
                    min={0}
                    step={0.01}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    className="!w-full"
                    placeholder="Enter price"
                  />
                </Form.Item>

                <Form.Item
                  name="discountAmount"
                  label="Discount Amount"
                >
                  <InputNumber
                    min={0}
                    step={0.01}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    className="!w-full"
                    placeholder="Enter discount amount (optional)"
                  />
                </Form.Item>

                <SelectCategory
                  setCategoryId={setCategoryId}
                  category="category"
                />

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please enter product description!' }]}
                >
                  <Input.TextArea rows={4} placeholder="Enter product description" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full py-2.5 text-lg">
                    Add Product
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}

        {/* All variants tab content */}
        {activeTab === '2' && (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Product Variants</h2>
            {variants.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No variants added yet. Click on "Add variant" to create one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-gray-600 font-semibold">Color</th>
                      <th className="py-3 px-4 text-left text-gray-600 font-semibold">Sizes</th>
                      <th className="py-3 px-4 text-left text-gray-600 font-semibold">Quantity</th>
                      <th className="py-3 px-4 text-left text-gray-600 font-semibold">Added Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {variants.map((variant, index) => (
                      <tr key={variant.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div
                              className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                              style={{ backgroundColor: colorOptions.find(c => c.value === variant.color)?.color || '#fff' }}
                            />
                            {colorOptions.find(c => c.value === variant.color)?.label || 'N/A'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-2">
                            {variant.sizes?.map((size, i) => (
                              <Tag key={i} color="blue">{size}</Tag>
                            )) || 'No sizes selected'}
                          </div>
                        </td>
                        <td className="py-3 px-4">{variant.quantity}</td>
                        <td className="py-3 px-4">{variant.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Variant Modal */}
      <Modal
        title="Add Product Variant"
        open={isVariantModalVisible}
        onOk={handleVariantModalOk}
        onCancel={handleVariantModalCancel}
        footer={[
          <Button key="back" onClick={handleVariantModalCancel} className="rounded-lg px-6 py-2">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleVariantModalOk} className="rounded-lg px-6 py-2">
            Add Variant
          </Button>,
        ]}
      >
        <Form requiredMark={false} form={variantForm} layout="vertical" className="mt-4">
          <Form.Item label="Image Upload">
            <Upload accept='image/*' customRequest={dummyRequest} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />} className="w-full">Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Select Color">
            <Form.Item name="color">
              <Select
                value={selectedColor}
                onChange={(value) => setSelectedColor(`variants_${value}`)}
                className="w-full rounded-lg"
                placeholder="Select a variant color"
              >
                {colorOptions.map((color) => (
                  <Select.Option key={color.value} value={color.value}>
                    {color.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter quantity!' }]}
            className='!w-full'
          >
            <InputNumber className='!w-full' min={1} placeholder="Enter quantity" />
          </Form.Item>
          <div className="bg-gray-100 border border-gray-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Sizes/Dimensions</h3>
            <Space size={[8, 16]} wrap>
              {availableSizes.map((size) => (
                <Tag.CheckableTag
                  key={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeTagClick(size)}
                  className="!px-4 !py-2 !text-sm !shadow-sm !rounded-lg hover:!shadow-md !transition-all"
                >
                  {size}
                </Tag.CheckableTag>
              ))}
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
