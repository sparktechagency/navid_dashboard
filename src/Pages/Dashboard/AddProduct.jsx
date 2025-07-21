import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Upload,
  Row,
  Col,
  Tooltip,
  Select,
  InputNumber,
} from "antd";
import {
  VideoCameraOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PageHeading from "../../Components/Shared/PageHeading";
import toast from "react-hot-toast";
import { useCreateProductsMutation } from "../../Redux/services/ProductApis";
import SelectCategory from "../../Components/Shared/SelectCategory";
import { colorOptions } from "./color";

const { TextArea } = Input;

const AddProduct = () => {
  const [createNewProduct, { isLoading }] = useCreateProductsMutation();
  const [form] = Form.useForm();
  const [productType, setProductType] = useState("wholesaler");
  const [videoFile, setVideoFile] = useState(null);
  const [colorVariants, setColorVariants] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  const handleVideoChange = (info) => {
    setVideoFile(info.file);
    form.setFieldValue("variants_video", info.file);
  };

  const handleAddVariant = () => {
    setColorVariants([
      ...colorVariants,
      { color: "", image: null, quantity: 1 },
    ]);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...colorVariants];
    updatedVariants[index][field] = value;
    setColorVariants(updatedVariants);

    // Update form values
    if (field === "color") {
      form.setFieldsValue({
        [`variants_color_${index}`]: value,
      });
    }
  };

  const handleVariantImageChange = (info, index) => {
    const updatedVariants = [...colorVariants];
    updatedVariants[index].image = info.file;
    setColorVariants(updatedVariants);

    // Update form value
    form.setFieldsValue({
      [`variant_image_${index}`]: info.file,
    });
  };

  const handleVariantQuantityChange = (value, index) => {
    const updatedVariants = [...colorVariants];
    updatedVariants[index].quantity = value;
    setColorVariants(updatedVariants);

    // Update form value
    form.setFieldsValue({
      [`variant_quantity_${index}`]: value,
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...colorVariants];
    updatedVariants.splice(index, 1);
    setColorVariants(updatedVariants);

    // Remove form values
    form.setFieldsValue({
      [`variants_color_${index}`]: undefined,
      [`variant_image_${index}`]: undefined,
      [`variant_quantity_${index}`]: undefined,
    });
  };

  const onFinish = async (values) => {
    try {
      if (colorVariants.length === 0) {
        toast.error("Please add at least one variant");
        return;
      }

      const formData = new FormData();

      // Basic product info
      formData.append("category", categoryId);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("previous_price", values.previous_price);
      formData.append("product_type", productType); // 'wholesaler' or 'user'

      if (videoFile) {
        formData.append("variants_video", videoFile);
      }

      // Add variants
      colorVariants.forEach((variant, index) => {
        if (variant.color && variant.image) {
          formData.append(`variants_${variant.color}`, variant.image);
          formData.append(`quantity_${variant.color}`, variant.quantity);
        }
      });

      const res = await createNewProduct({ data: formData });
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Product created successfully");
        form.resetFields();
        setVideoFile(null);
        setColorVariants([]);
        setProductType("wholesaler");
      } else {
        toast.error(res?.error?.data?.message || "Product creation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product creation failed");
    }
  };

  return (
    <div className="bg-white min-h-full p-6 rounded-xl">
      <PageHeading text={"Manage Products"} />

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
          {/* Product Video Upload */}
          <Col xs={24} sm={12} md={12} lg={8}>
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
                  className="!mt-2 !bg-red-500 !text-white"
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

            {/* Variants Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <label className="block font-medium">Product Variants</label>
                <Button
                  type="dashed"
                  onClick={handleAddVariant}
                  icon={<PlusOutlined />}
                >
                  Add Variant
                </Button>
              </div>

              {colorVariants.map((variant, index) => (
                <div key={index} className="mb-4 p-3 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Variant {index + 1}</h4>
                    <Button
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removeVariant(index)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1 text-sm">Color</label>
                      <Select
                        placeholder="Select color"
                        value={variant.color}
                        onChange={(value) =>
                          handleVariantChange(index, "color", value)
                        }
                        className="w-full"
                      >
                        {colorOptions.map((color) => (
                          <Select.Option key={color.value} value={color.value}>
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2"
                                style={{ backgroundColor: color.color }}
                              />
                              {color.label}
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm">Quantity</label>
                      <InputNumber
                        min={1}
                        value={variant.quantity}
                        onChange={(value) =>
                          handleVariantQuantityChange(value, index)
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block mb-1 text-sm">Image</label>
                    {variant.image ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(variant.image)}
                          alt={`Variant ${index + 1}`}
                          className="w-full h-24 object-contain border rounded"
                        />
                        <Button
                          size="small"
                          danger
                          className="absolute top-1 right-1"
                          onClick={() =>
                            handleVariantChange(index, "image", null)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={() => false}
                        accept="image/*"
                        onChange={(info) =>
                          handleVariantImageChange(info, index)
                        }
                      >
                        <div>
                          <PlusOutlined />
                          <div className="mt-2">Upload</div>
                        </div>
                      </Upload>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* Product Details */}
          <Col xs={24} sm={12} md={12} lg={16}>
            {/* Product Type Selection */}
            <Form.Item
              label="Product Type"
              name="product_type"
              rules={[
                { required: true, message: "Please select product type" },
              ]}
            >
              <Radio.Group
                onChange={(e) => setProductType(e.target.value)}
                value={productType}
                optionType="button"
                buttonStyle="solid"
              >
                <Radio.Button value="wholesaler">Wholesaler</Radio.Button>
                <Radio.Button value="user">Only User</Radio.Button>
              </Radio.Group>
            </Form.Item>

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
              <Col xs={24} sm={12} md={12} lg={24}>
                <Form.Item
                  label="Discount Amount"
                  name="previous_price"
                  rules={[
                    { required: true, message: "Please enter the discount" },
                  ]}
                >
                  <Input placeholder="please enter discount" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <SelectCategory
                  setCategoryId={setCategoryId}
                  category="category"
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
                onClick={() => {
                  form.resetFields();
                  setVideoFile(null);
                  setColorVariants([]);
                  setProductType("wholesaler");
                }}
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
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
