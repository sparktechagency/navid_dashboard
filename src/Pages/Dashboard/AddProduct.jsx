import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, InputNumber, Tabs } from 'antd';
import { useCreateProductsMutation } from '../../Redux/services/ProductApis';
import toast from 'react-hot-toast';
import SelectSubCategory from '../../Components/Shared/SelectSubCategory';
import ProductVideoUpload from '../../Components/AddProduct/ProductVideoUpload';
import VariantsSection from '../../Components/AddProduct/VariantsSection';
import ProductTypeSelector from '../../Components/AddProduct/ProductTypeSelector';
import SelectCategory from '../../Components/Shared/SelectCategory';
import PageHeading from '../../Components/Shared/PageHeading';

const { TextArea } = Input;

const AddProduct = () => {
  const [createNewProduct, { isLoading }] = useCreateProductsMutation();
  const [form] = Form.useForm();
  const [productType, setProductType] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [colorVariants, setColorVariants] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);

  const handleAddVariant = () => {
    setColorVariants([
      ...colorVariants,
      { color: '', image: null, quantity: 1 },
    ]);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...colorVariants];
    updatedVariants[index][field] = value;
    setColorVariants(updatedVariants);

    if (field === 'color') {
      form.setFieldsValue({
        [`variants_color_${index}`]: value,
      });
    }
  };

  const handleVariantImageChange = (info, index) => {
    const updatedVariants = [...colorVariants];
    updatedVariants[index].image = info.file;
    setColorVariants(updatedVariants);
    form.setFieldsValue({
      [`variant_image_${index}`]: info.file,
    });
  };

  const handleVariantQuantityChange = (value, index) => {
    const updatedVariants = [...colorVariants];
    updatedVariants[index].quantity = value;
    setColorVariants(updatedVariants);
    form.setFieldsValue({
      [`variant_quantity_${index}`]: value,
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...colorVariants];
    updatedVariants.splice(index, 1);
    setColorVariants(updatedVariants);
    form.setFieldsValue({
      [`variants_color_${index}`]: undefined,
      [`variant_image_${index}`]: undefined,
      [`variant_quantity_${index}`]: undefined,
    });
  };

  const onFinish = async (values) => {
    try {
      if (colorVariants.length === 0) {
        toast.error('Please add at least one variant');
        return;
      }

      const formData = new FormData();

      // Basic product info
      formData.append('category', categoryId);
      formData.append('sub_category', subCategoryId);
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('previous_price', values.previous_price);
      formData.append('whole_sale', productType);

      if (videoFile) {
        formData.append('variants_video', videoFile);
      }

      // Add variants
      colorVariants.forEach((variant) => {
        if (variant.color && variant.image) {
          formData.append(`variants_${variant.color}`, variant.image);
          formData.append(`quantity_${variant.color}`, variant.quantity);
        }
      });

      await createNewProduct({ data: formData }).unwrap().then((res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message || 'Product created successfully');
          form.resetFields();
          setVideoFile(null);
          setColorVariants([]);
          setProductType(true);
          setCategoryId(null);
          setSubCategoryId(null);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('Product creation failed');
    }
  };

  const handleResetForm = () => {
    form.resetFields();
    setVideoFile(null);
    setColorVariants([]);
    setProductType(true);
  };
  const [activeTab, setActiveTab] = useState('1');
  const onTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <div className="bg-white min-h-full p-6 rounded-xl">
      <PageHeading text={"Manage Products"} />
      <Tabs activeKey={activeTab} onChange={onTabChange} centered className="mb-6">
        <Tabs.TabPane tab="Add product" key="1" />
        <Tabs.TabPane tab="All variants" key="2" />
      </Tabs>
      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          price: "",
          category: "",
          previous_price: 0,
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Left Column */}
          {activeTab === '1' && <Col xs={24} sm={12} md={12} lg={8}>
            <ProductVideoUpload
              videoFile={videoFile}
              setVideoFile={setVideoFile}
              form={form}
            />
            <Button type="primary" onClick={() => setActiveTab('2')}>Add Variant</Button>
          </Col>}

          {/* Right Column */}
          {activeTab === '1' && <Col xs={24} sm={12} md={12} lg={16}>
            <ProductTypeSelector
              productType={productType}
              setProductType={setProductType}
            />

            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter product name" },
                  ]}
                >
                  <Input placeholder="Please enter product name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please enter the price" },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter price"
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    { required: true, message: "Please enter the quantity" },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter quantity"
                    min={0}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  label="Discount Amount"
                  name="previous_price"
                  rules={[
                    { required: true, message: "Please enter the discount" },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter discount"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={24}>
                <SelectCategory
                  setCategoryId={setCategoryId}
                  category="category"
                />
                <SelectSubCategory
                  setSubCategoryId={setSubCategoryId}
                  subCategory="subCategory"
                  categoryId={categoryId}
                />
              </Col>
            </Row>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a product description",
                },
              ]}
            >
              <TextArea rows={8} placeholder="Write here...." />
            </Form.Item>

            <div className="flex justify-between space-x-2 gap-4">
              <Button
                type="default"
                className="w-full"
                onClick={handleResetForm}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                Publish
              </Button>
            </div>
          </Col>}
          {activeTab === '2' && <VariantsSection
            colorVariants={colorVariants}
            handleAddVariant={handleAddVariant}
            handleVariantChange={handleVariantChange}
            handleVariantImageChange={handleVariantImageChange}
            handleVariantQuantityChange={handleVariantQuantityChange}
            removeVariant={removeVariant}
          />}
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
