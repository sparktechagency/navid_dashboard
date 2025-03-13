import React, { useEffect, useState } from 'react';
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
  Image,
} from 'antd';
import {
  VideoCameraOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import PageHeading from '../../Components/Shared/PageHeading';
import toast from 'react-hot-toast';
import { useCreateProductsMutation } from '../../Redux/services/ProductApis';
import SelectCategory from '../../Components/Shared/SelectCategory';

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
  const [createNewProduct, { isLoading }] = useCreateProductsMutation();
  const [form] = Form.useForm();
  const [tab, setTab] = useState('Wholesaler');
  const [videoFile, setVideoFile] = useState(null);
  const [colorImages, setColorImages] = useState({});
  const [colorImagePreviews, setColorImagePreviews] = useState({});
  const handleVideoChange = (info) => {
    setVideoFile(info.file);
    form.setFieldValue('variants_video', info.file);
  };

  const handleColorImageChange = (info, color) => {
    const key = `variants_${color.toLowerCase()}`;

    if (info.file) {
      setColorImages((prev) => ({
        ...prev,
        [key]: info.file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setColorImagePreviews((prev) => ({
          ...prev,
          [key]: reader.result,
        }));
      };
      reader.readAsDataURL(info.file);

      form.setFieldValue(key, info.file);
    } else {
      setColorImages((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });

      setColorImagePreviews((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });

      form.setFieldValue(key, undefined);
    }
  };

  const removeColorImage = (color) => {
    const key = `variants_${color.toLowerCase()}`;

    setColorImages((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });

    setColorImagePreviews((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });

    form.setFieldValue(key, undefined);
  };

  const colorOptions = [
    { value: 'red', color: 'bg-red-500', label: 'Red' },
    { value: 'blue', color: 'bg-blue-500', label: 'Blue' },
    { value: 'green', color: 'bg-green-500', label: 'Green' },
    { value: 'yellow', color: 'bg-yellow-500', label: 'Yellow' },
    { value: 'purple', color: 'bg-purple-500', label: 'Purple' },
    { value: 'orange', color: 'bg-orange-500', label: 'Orange' },
    { value: 'black', color: 'bg-black', label: 'Black' },
    {
      value: 'white',
      color: 'bg-white border border-gray-300',
      label: 'White',
    },
    { value: 'pink', color: 'bg-pink-500', label: 'Pink' },
  ];

  const onFinish = async (values) => {
    try {
      const cleanValues = { ...values };
      console.log(colorImages.length);
      if (colorImages.length <= 0) {
        toast.error('set atlast one image');
        return;
      }
      colorOptions.forEach((color) => {
        const key = `variants_${color.value}`;
        if (!cleanValues[key]) {
          delete cleanValues[key];
        }
      });

      const formData = new FormData();

      formData.append('category', cleanValues.category);
      formData.append('name', cleanValues.name);
      formData.append('price', cleanValues.price);
      formData.append('quantity', cleanValues.quantity);
      formData.append('whole_sale', cleanValues.whole_sale);
      formData.append('description', cleanValues.description);

      if (videoFile) {
        formData.append('variants_video', videoFile);
      }

      Object.keys(cleanValues)
        .filter(
          (key) => key.startsWith('variants_') && key !== 'variants_video'
        )
        .forEach((key) => {
          formData.append(key, cleanValues[key]);
        });
      console.log(cleanValues);

      const res = await createNewProduct({ data: cleanValues });
      if (res?.data?.success) {
        console.log(res);
        toast.success(res?.data?.message || 'Product created successfully');
      } else {
        console.log(res);
        toast.error(res?.error?.data?.message || 'product created failed');
      }
    } catch (error) {
      console.log(error);
      toast.error(res?.error?.data?.message || 'Product created failed');
    }
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
          price: '',
          category: '',
          quantity: '',
          whole_sale: true,
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Product Video Upload */}
          <Col xs={24} sm={12} md={12} lg={8}>
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

            {/* Color-based Image Uploads */}
            <div className="mt-4">
              <label className="block mb-2 font-medium">
                Upload Images by Color
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Select colors for product variants (optional)
              </p>

              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((item) => {
                  const fieldName = `variants_${item.value}`;
                  const hasImage = !!colorImagePreviews[fieldName];

                  return (
                    <Tooltip
                      title={`Upload ${item.label} variant image`}
                      key={item.value}
                    >
                      <div className="text-center">
                        <div
                          className={`w-full h-8 ${item.color} rounded mb-1`}
                        ></div>
                        <Form.Item name={fieldName} noStyle>
                          <Upload
                            listType="picture"
                            showUploadList={false}
                            onChange={(info) =>
                              handleColorImageChange(info, item.value)
                            }
                            beforeUpload={() => false}
                            accept="image/*"
                          >
                            <Button
                              icon={<PlusOutlined />}
                              size="small"
                              className="w-full"
                            >
                              {hasImage ? 'Change' : 'Add'}
                            </Button>
                          </Upload>
                        </Form.Item>

                        {hasImage && (
                          <div className="mt-2 relative">
                            <div className="border border-gray-200 rounded p-1">
                              <img
                                src={colorImagePreviews[fieldName]}
                                alt={`${item.label} variant`}
                                className="w-full h-16 object-contain rounded"
                              />
                              <Button
                                size="small"
                                danger
                                icon={<DeleteOutlined />}
                                className="absolute top-0 right-0 rounded-full border-none m-1"
                                onClick={() => removeColorImage(item.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </Col>

          {/* Product Details */}
          <Col xs={24} sm={12} md={12} lg={16}>
            {/* Tab Selection */}
            <Form.Item
              rules={[{ required: true, message: 'Please select a tab' }]}
              label="Publish Products For"
              name="whole_sale"
            >
              <Radio.Group onChange={(e) => setTab(e.target.value)} value={tab}>
                <Radio value={true}>Wholesaler</Radio>
                <Radio value={false}>Only User</Radio>
              </Radio.Group>
            </Form.Item>

            <Row gutter={24}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please enter product name' },
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
                    { required: true, message: 'Please enter the price' },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter price"
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
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
                    { required: true, message: 'Please enter the quantity' },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter quantity"
                    min={1}
                    precision={0}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <SelectCategory category="category" />
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
              <TextArea rows={8} placeholder="Write here...." />
            </Form.Item>
            <div className="flex justify-between space-x-2 gap-4">
              <Button
                type="default"
                className="w-full"
                onClick={() => {
                  form.resetFields();
                  setVideoFile(null);
                  setColorImages({});
                  setColorImagePreviews({});
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
