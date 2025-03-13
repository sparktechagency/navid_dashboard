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
  Modal,
  Spin,
} from 'antd';
import {
  VideoCameraOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import PageHeading from '../../Components/Shared/PageHeading';
import toast from 'react-hot-toast';
import { useUpdateProductMutation } from '../../Redux/services/ProductApis';
import { useLocation, useNavigate } from 'react-router';
import SelectCategory from '../../Components/Shared/SelectCategory';

const { TextArea } = Input;

const ProductEditing = () => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state;

  const [form] = Form.useForm();
  const [tab, setTab] = useState(productData?.whole_sale ?? true);
  const [videoFile, setVideoFile] = useState(null);
  const [colorImages, setColorImages] = useState({});
  const [colorImagePreviews, setColorImagePreviews] = useState({});
  const [existingImages, setExistingImages] = useState({});
  const [productVideo, setProductVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewMedia, setPreviewMedia] = useState({
    type: null,
    url: null,
    title: null,
  });
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [deletedVariants, setDeletedVariants] = useState([]);
  const [retainedVariants, setRetainedVariants] = useState([]);
  const [retainedVariantData, setRetainedVariantData] = useState([]);

  useEffect(() => {
    if (!productData?.id && !productData?.id) {
      toast.error('Product data not found');
      navigate(-1);
      return;
    }
  }, [productData, navigate]);
  const [categoryId, setCategoryId] = useState(productData?.categoryId);
  console.log('asdhjaksd asdjhasd aksjhdjas ashd as n', productData.whole_sale);
  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        name: productData?.productName ?? '',
        price: productData.price ?? 0,
        quantity: productData.quantity ?? 1,
        category: productData?.category ?? '',
        description: productData.description ?? '',
        whole_sale: productData.whole_sale ?? true,
      });

      if (productData.variantImages) {
        const previews = {};
        const existingImgs = {};
        const retained = [];
        const retainedData = [];

        Object.entries(productData.variantImages).forEach(([color, images]) => {
          if (images && images.length > 0) {
            const key = `variants_${color.toLowerCase()}`;
            const imageUrl = images[0].startsWith('http')
              ? images[0]
              : `${import.meta.env.VITE_PUBLIC_API_URL || ''}/${images[0]}`;

            previews[key] = imageUrl;
            existingImgs[key] = images[0];
            retained.push(color.toLowerCase());

            retainedData.push({
              img: [images[0]],
              color: color.toLowerCase(),
            });
          }
        });

        setColorImagePreviews(previews);
        setExistingImages(existingImgs);
        setRetainedVariants(retained);
        setRetainedVariantData(retainedData);
      }

      if (productData.video) {
        setProductVideo(productData.video);
        setVideoPreview(
          `${import.meta.env.VITE_PUBLIC_API_URL || ''}/${productData.video}`
        );
      }
    }
  }, [productData, form]);

  const handleVideoChange = (info) => {
    setLoadingVideo(true);

    if (info.file) {
      const videoURL = URL.createObjectURL(info.file);
      setVideoFile(info.file);
      setVideoPreview(videoURL);
      setProductVideo(null);

      if (info.file.size > 100 * 1024 * 1024) {
        toast.error('Video file is too large. Maximum size is 100MB.');
        setVideoFile(null);
        setVideoPreview(null);
      }
    }

    setLoadingVideo(false);
  };

  const handleColorImageChange = (info, color) => {
    const key = `variants_${color.toLowerCase()}`;
    const colorLower = color.toLowerCase();

    if (info.file) {
      if (info.file.size > 5 * 1024 * 1024) {
        toast.error(`Image for ${color} is too large. Maximum size is 5MB.`);
        return;
      }

      setColorImages((prev) => ({
        ...prev,
        [key]: info.file,
      }));

      setDeletedVariants((prev) => prev.filter((item) => item !== colorLower));

      setRetainedVariants((prev) => {
        if (!prev.includes(colorLower)) {
          return [...prev, colorLower];
        }
        return prev;
      });

      setExistingImages((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });

      const reader = new FileReader();
      reader.onload = () => {
        setColorImagePreviews((prev) => ({
          ...prev,
          [key]: reader.result,
        }));
      };
      reader.readAsDataURL(info.file);
    }
  };

  const removeColorImage = (color) => {
    const key = `variants_${color.toLowerCase()}`;
    const colorLower = color.toLowerCase();

    if (!deletedVariants.includes(colorLower)) {
      setDeletedVariants([...deletedVariants, colorLower]);
    }

    setRetainedVariants((prev) => prev.filter((item) => item !== colorLower));

    setRetainedVariantData((prev) =>
      prev.filter((item) => item.color !== colorLower)
    );

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

    setExistingImages((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

  const removeVideo = () => {
    // setRemoveVideoPath(productData.video)
    setVideoFile(null);
    setVideoPreview(null);
    setProductVideo(null);
  };

  const showPreview = (type, url, title) => {
    setPreviewMedia({ type, url, title });
    setPreviewVisible(true);
  };

  const handlePreviewClose = () => {
    setPreviewVisible(false);
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
    if (!productData?.id) {
      toast.error('Cannot update: Missing product ID');
      return;
    }

    if (!categoryId) {
      toast.error('Cannot update: Missing Category');
    }

    try {
      const formData = new FormData();

      formData.append('id', productData.id);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', categoryId);
      formData.append('quantity', values.quantity);
      formData.append('whole_sale', values.whole_sale);

      if (deletedVariants.length > 0) {
        const deletedPaths = productData.variantImages
          ? deletedVariants
              .map((color) => {
                const images = productData.variantImages[color];
                return images && images.length > 0 ? images[0] : null;
              })
              .filter(Boolean)
          : [];

        formData.append('deleted_variants', JSON.stringify(deletedPaths));
      } else {
        formData.append('deleted_variants', JSON.stringify([]));
      }

      const finalRetainedVariants = [...retainedVariantData];

      Object.entries(colorImages).forEach(([key, file]) => {
        if (file instanceof File) {
          const color = key.replace('variants_', '');

          const existingIndex = finalRetainedVariants.findIndex(
            (item) => item.color === color
          );

          if (existingIndex === -1) {
            finalRetainedVariants.push({
              color: color,
              img: [],
            });
          }
        }
      });

      formData.append(
        'retained_variants',
        JSON.stringify(finalRetainedVariants)
      );

      if (videoFile) {
        formData.append('video', videoFile);
      } else if (productVideo) {
        formData.append('video', productVideo);
      } else {
        formData.append('video', '');
      }

      colorOptions.forEach((color) => {
        const key = `variants_${color.value}`;
        const file = colorImages[key];

        if (file instanceof File) {
          formData.append(key, file);
        }
      });

      const response = await updateProduct({
        id: productData.id,
        data: formData,
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to update product');
      }

      toast.success('Product updated successfully!');
      window.location.href = '/manage-products';
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.message || 'Error updating product');
    }
  };

  if (!productData) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full p-6 rounded-xl">
      <PageHeading text={'Edit Product'} />

      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: productData?.productName ?? '',
          price:
            typeof productData?.price === 'string'
              ? Number(productData.price.replace(/\$/g, ''))
              : productData?.price ?? 0,
          quantity: productData.quantity ?? 1,
          category: productData?.category ?? '',
          description: productData.description ?? '',
          whole_sale: productData.whole_sale ?? true,
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Product Video and Images Section */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-4">Product Media</h3>

              {/* Video Section */}
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
                        onClick={() =>
                          showPreview('video', videoPreview, 'Product Video')
                        }
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        className="rounded-full"
                        onClick={removeVideo}
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

              {/* Color Variants Section */}
              <div>
                <label className="block mb-2 font-medium">
                  Product Color Variants
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  Add images for each color variant
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((item) => {
                    const fieldName = `variants_${item.value}`;
                    const hasImage = !!colorImagePreviews[fieldName];
                    const isExistingVariant =
                      productData?.variantColors?.includes(item.value);

                    return (
                      <Tooltip
                        title={`${item.label} variant ${
                          isExistingVariant ? '(existing)' : ''
                        }`}
                        key={item.value}
                      >
                        <div className="text-center">
                          <div
                            className={`w-full h-8 ${item.color} rounded mb-1 ${
                              isExistingVariant ? 'ring-2 ring-blue-500' : ''
                            }`}
                          ></div>

                          {hasImage ? (
                            <div className="mt-2 relative border border-gray-200 rounded p-1">
                              <img
                                src={colorImagePreviews[fieldName]}
                                alt={`${item.label} variant`}
                                className="w-full h-16 object-contain rounded cursor-pointer"
                                onClick={() =>
                                  showPreview(
                                    'image',
                                    colorImagePreviews[fieldName],
                                    `${item.label} Variant`
                                  )
                                }
                              />
                              <div className="absolute top-1 right-1 flex gap-1">
                                <Button
                                  size="small"
                                  type="text"
                                  icon={<EditOutlined />}
                                  className="flex items-center justify-center h-6 w-6 rounded-full bg-white/70"
                                  onClick={() =>
                                    document
                                      .getElementById(`upload-${item.value}`)
                                      .click()
                                  }
                                />
                                <Button
                                  size="small"
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  className="flex items-center justify-center h-6 w-6 rounded-full bg-white/70"
                                  onClick={() => removeColorImage(item.value)}
                                />
                              </div>
                            </div>
                          ) : (
                            <Upload
                              id={`upload-${item.value}`}
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
                                Add
                              </Button>
                            </Upload>
                          )}
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </Col>

          {/* Product Details Section */}
          <Col xs={24} sm={12} md={12} lg={16}>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-4">Product Details</h3>

              {/* Product Type Selection */}
              <Form.Item
                rules={[{ required: true, message: 'Please select an option' }]}
                label="Publish Products For"
                name="whole_sale"
              >
                <Radio.Group
                  onChange={(e) => setTab(e.target.value)}
                  value={tab}
                >
                  <Radio value={true}>Wholesaler</Radio>
                  <Radio value={false}>Only User</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Product Name and Price */}
              <Row gutter={16}>
                <Col xs={24} sm={12}>
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
                <Col xs={24} sm={12}>
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
                      addonBefore="$"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Quantity and Category */}
              <Row gutter={16}>
                <Col xs={24} sm={12}>
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
                <Col xs={24} sm={12}>
                  <SelectCategory
                    setCategoryId={setCategoryId}
                    productData={productData}
                    category={'category'}
                  />
                </Col>
              </Row>

              {/* Description */}
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
                <TextArea
                  rows={8}
                  placeholder="Write product description here..."
                />
              </Form.Item>

              {/* Action Buttons */}
              <div className="flex justify-between space-x-4 mt-4">
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
          </Col>
        </Row>
      </Form>

      {/* Preview Modal */}
      <Modal
        visible={previewVisible}
        title={previewMedia.title}
        footer={null}
        onCancel={handlePreviewClose}
        width={800}
      >
        {previewMedia.type === 'image' ? (
          <img alt="preview" style={{ width: '100%' }} src={previewMedia.url} />
        ) : (
          <video width="100%" controls src={previewMedia.url}></video>
        )}
      </Modal>
    </div>
  );
};

export default ProductEditing;
