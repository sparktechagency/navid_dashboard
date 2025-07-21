// import React, { useState } from 'react';
// import {
//   Tabs,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Button,
//   Radio,
//   Upload,
//   Modal,
//   Space,
//   Tag,
//   ColorPicker,
// } from 'antd';
// import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

// // Main App Component
// const App = () => {
//   const [activeTab, setActiveTab] = useState('1');
//   const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);
//   const [productForm] = Form.useForm();
//   const [variantForm] = Form.useForm();
//   const [selectedSizes, setSelectedSizes] = useState([]); // State for selected sizes/dimensions
//   const [selectedColor, setSelectedColor] = useState('#1677FF'); // State for selected color in variant modal

//   // Handle tab change
//   const onTabChange = (key) => {
//     setActiveTab(key);
//   };

//   // Show/Hide Variant Modal
//   const showVariantModal = () => {
//     setIsVariantModalVisible(true);
//   };

//   const handleVariantModalOk = () => {
//     variantForm.validateFields().then((values) => {
//       console.log('Variant added:', { ...values, color: selectedColor });
//       // Here you would typically add the variant to a list in your state
//       setIsVariantModalVisible(false);
//       variantForm.resetFields();
//       setSelectedColor('#1677FF'); // Reset color
//     }).catch(info => {
//       console.log('Validate Failed:', info);
//     });
//   };

//   const handleVariantModalCancel = () => {
//     setIsVariantModalVisible(false);
//     variantForm.resetFields();
//     setSelectedColor('#1677FF'); // Reset color
//   };

//   // Handle product form submission
//   const onProductFinish = (values) => {
//     console.log('Product form submitted:', { ...values, selectedSizes });
//     // You would typically send this data to your backend
//   };

//   // Dummy upload function for Ant Design Upload component
//   const dummyRequest = ({ file, onSuccess }) => {
//     setTimeout(() => {
//       onSuccess("ok");
//     }, 0);
//   };

//   // Handle size/dimension tag selection
//   const handleSizeTagClick = (size) => {
//     setSelectedSizes((prevSelected) =>
//       prevSelected.includes(size)
//         ? prevSelected.filter((s) => s !== size)
//         : [...prevSelected, size]
//     );
//   };

//   // Options for product category select
//   const categoryOptions = [
//     { value: 'electronics', label: 'Electronics' },
//     { value: 'clothing', label: 'Clothing' },
//     { value: 'home_goods', label: 'Home Goods' },
//     { value: 'books', label: 'Books' },
//   ];

//   // Common sizes/dimensions
//   const availableSizes = ['Small', 'Medium', 'Large', '30mm', '40mm'];

//   return (
//     <div className="p-4 md:p-8 lg:p-12 bg-gray-50 min-h-screen font-sans">
      
//       <div className="mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">
//         <Tabs activeKey={activeTab} onChange={onTabChange} centered className="mb-6">
//           <Tabs.TabPane tab="Add product / update product" key="1" />
//           <Tabs.TabPane tab="All variants" key="2" />
//         </Tabs>

//         {activeTab === '1' && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Section: Add Variants and Video */}
//             <div className="space-y-6">
//               <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm">
//                 <h3 className="text-xl font-semibold text-blue-800 mb-4">Add Variants</h3>
//                 <Button
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   onClick={showVariantModal}
//                   className="w-full py-2.5 text-lg"
//                 >
//                   Add variant
//                 </Button>
//               </div>

//               <div className="bg-gray-100 border border-gray-200 p-6 rounded-xl shadow-sm">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-4">Video Upload</h3>
//                 <Upload customRequest={dummyRequest} listType="picture" maxCount={1}>
//                   <Button icon={<UploadOutlined />} className="w-full py-2.5 text-lg">
//                     Upload Video
//                   </Button>
//                 </Upload>
//                 <p className="text-sm text-gray-500 mt-2">Max 1 video file.</p>
//               </div>

//               {/* Size/Dimension Tags */}
//               <div className="bg-gray-100 border border-gray-200 p-6 rounded-xl shadow-sm">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Sizes/Dimensions</h3>
//                 <Space size={[8, 16]} wrap>
//                   {availableSizes.map((size) => (
//                     <Tag.CheckableTag
//                       key={size}
//                       checked={selectedSizes.includes(size)}
//                       onChange={() => handleSizeTagClick(size)}
//                       className="px-4 py-2 text-base rounded-lg shadow-sm hover:shadow-md transition-all"
//                     >
//                       {size}
//                     </Tag.CheckableTag>
//                   ))}
//                 </Space>
//                 <p className="text-sm text-gray-500 mt-4">Select applicable sizes/dimensions for the product.</p>
//               </div>
//             </div>

//             {/* Right Section: Add Product Form */}
//             <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Product</h3>
//               <Form
//                 form={productForm}
//                 layout="vertical"
//                 onFinish={onProductFinish}
//                 initialValues={{ userType: 'wholesaler' }}
//               >
//                 <Form.Item name="userType" className="mb-6">
//                   <Radio.Group buttonStyle="solid" className="flex justify-center">
//                     <Radio.Button value="wholesaler" className="flex-1 text-center py-2.5 text-base rounded-l-lg">Wholesaler</Radio.Button>
//                     <Radio.Button value="onlyUser" className="flex-1 text-center py-2.5 text-base rounded-r-lg">Only User</Radio.Button>
//                   </Radio.Group>
//                 </Form.Item>

//                 <Form.Item
//                   name="name"
//                   label="Product Name"
//                   rules={[{ required: true, message: 'Please enter product name!' }]}
//                 >
//                   <Input placeholder="Enter product name" />
//                 </Form.Item>

//                 <Form.Item
//                   name="price"
//                   label="Price"
//                   rules={[{ required: true, message: 'Please enter product price!' }]}
//                 >
//                   <InputNumber
//                     min={0}
//                     step={0.01}
//                     formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
//                     className="w-full"
//                     placeholder="Enter price"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="discountAmount"
//                   label="Discount Amount"
//                 >
//                   <InputNumber
//                     min={0}
//                     step={0.01}
//                     formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
//                     className="w-full"
//                     placeholder="Enter discount amount (optional)"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="category"
//                   label="Select a Category"
//                   rules={[{ required: true, message: 'Please select a category!' }]}
//                 >
//                   <Select placeholder="Select a category" options={categoryOptions} />
//                 </Form.Item>

//                 <Form.Item
//                   name="description"
//                   label="Description"
//                   rules={[{ required: true, message: 'Please enter product description!' }]}
//                 >
//                   <Input.TextArea rows={4} placeholder="Enter product description" />
//                 </Form.Item>

//                 <Form.Item>
//                   <Button type="primary" htmlType="submit" className="w-full py-2.5 text-lg">
//                     Add Product
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </div>
//           </div>
//         )}

//         {/* This section would be for "All variants" tab content */}
//         {activeTab === '2' && (
//           <div className="p-8 text-center text-gray-600">
//             <h2 className="text-2xl font-semibold mb-4">All Product Variants</h2>
//             <p>This section would display a list or table of all added product variants.</p>
//             {/* You would render a list/table of variants here */}
//           </div>
//         )}
//       </div>

//       {/* Add Variant Modal */}
//       <Modal
//         title="Add Product Variant"
//         open={isVariantModalVisible}
//         onOk={handleVariantModalOk}
//         onCancel={handleVariantModalCancel}
//         footer={[
//           <Button key="back" onClick={handleVariantModalCancel} className="rounded-lg px-6 py-2">
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleVariantModalOk} className="rounded-lg px-6 py-2">
//             Add Variant
//           </Button>,
//         ]}
//       >
//         <Form form={variantForm} layout="vertical" className="mt-4">
//           <Form.Item label="Image Upload">
//             <Upload customRequest={dummyRequest} listType="picture" maxCount={1}>
//               <Button icon={<UploadOutlined />} className="w-full">Upload Image</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item label="Select Color">
//             <div className="flex items-center space-x-2">
//               <ColorPicker value={selectedColor} onChange={(color) => setSelectedColor(color.toHexString())} />
//               <Input value={selectedColor} readOnly className="flex-grow rounded-lg" />
//             </div>
//           </Form.Item>

//           <Form.Item
//             name="quantity"
//             label="Quantity"
//             rules={[{ required: true, message: 'Please enter quantity!' }]}
//           >
//             <InputNumber min={1} className="w-full rounded-lg" placeholder="Enter quantity" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default App;