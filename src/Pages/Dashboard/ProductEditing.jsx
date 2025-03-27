import React, { useEffect, useState, useCallback } from 'react';
import { Form, Row, Col, Modal, Spin } from 'antd';
import {
  useSingleProductGetQuery,
  useUpdateProductMutation,
} from '../../Redux/services/ProductApis';
import { useLocation, useNavigate } from 'react-router';
import PageHeading from '../../Components/Shared/PageHeading';
import toast from 'react-hot-toast';
import { imageUrl } from '../../Utils/server';
import ProductMediaSection from './ProductMediaSection';
import ProductDetailsSection from './ProductDetailsSection';

const colorOptions = [
  { value: 'red', color: 'bg-red-500', label: 'Red' },
  { value: 'blue', color: 'bg-blue-500', label: 'Blue' },
  { value: 'green', color: 'bg-green-500', label: 'Green' },
  { value: 'yellow', color: 'bg-yellow-500', label: 'Yellow' },
  { value: 'purple', color: 'bg-purple-500', label: 'Purple' },
  { value: 'orange', color: 'bg-orange-500', label: 'Orange' },
  { value: 'black', color: 'bg-black', label: 'Black' },
  { value: 'white', color: 'bg-white border border-gray-300', label: 'White' },
  { value: 'pink', color: 'bg-pink-500', label: 'Pink' },
];

const ProductEditing = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.state;

  const { data: productData, isLoading: singleProductLoading } =
    useSingleProductGetQuery({ id: productId });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [tab, setTab] = useState(productData?.data?.whole_sale ?? true);
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
  const [categoryId, setCategoryId] = useState(null);
  console.log('und', productData?.data?.category?._id);
  console.log(productData?.data);
  useEffect(() => {
    if (productData) {
      const initialData = {
        category: productData?.data?.category?._id,
        name: productData?.data?.name,
        price: productData?.data?.price,
        quantity: productData?.data?.quantity,
        description: productData?.data?.description,
        whole_sale: productData?.data?.whole_sale,
        previous_price: productData?.data?.previous_price,
      };
      form.setFieldsValue(initialData);
      setCategoryId(productData?.data?.category?._id);
      if (productData?.data?.variantImages) {
        const previews = {};
        const existingImgs = {};
        const retained = [];
        const retainedData = [];

        Object.entries(productData?.data?.variantImages).forEach(
          ([color, images]) => {
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
          }
        );

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

  const handleVideoChange = useCallback((info) => {
    setLoadingVideo(true);

    if (info.file) {
      if (info.file.size > 100 * 1024 * 1024) {
        toast.error('Video file is too large. Maximum size is 100MB.');
        setLoadingVideo(false);
        return;
      }

      const videoURL = URL.createObjectURL(info.file);
      setVideoFile(info.file);
      setVideoPreview(videoURL);
      setProductVideo(null);
    }

    setLoadingVideo(false);
  }, []);

  const handleColorImageChange = useCallback((info, color) => {
    const key = `variants_${color.toLowerCase()}`;
    const colorLower = color.toLowerCase();

    if (info.file) {
      if (info.file.size > 5 * 1024 * 1024) {
        toast.error(`Image for ${color} is too large. Maximum size is 5MB.`);
        return;
      }

      setColorImages((prev) => ({ ...prev, [key]: info.file }));
      setDeletedVariants((prev) => prev.filter((item) => item !== colorLower));
      setRetainedVariants((prev) =>
        prev.includes(colorLower) ? prev : [...prev, colorLower]
      );
      setExistingImages((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });

      const reader = new FileReader();
      reader.onload = () => {
        setColorImagePreviews((prev) => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(info.file);
    }
  }, []);

  const removeColorImage = useCallback(
    (color) => {
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
    },
    [deletedVariants]
  );

  const removeVideo = useCallback(() => {
    setVideoFile(null);
    setVideoPreview(null);
    setProductVideo(null);
  }, []);

  const showPreview = useCallback((type, url, title) => {
    setPreviewMedia({ type, url, title });
    setPreviewVisible(true);
  }, []);

  const handlePreviewClose = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('id', productData.id);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', categoryId);
      formData.append('quantity', values.quantity);
      formData.append('whole_sale', values.whole_sale);
      formData.append('previous_price', values.previous_price);

      const deletedPaths = productData?.data?.variantImages
        ? deletedVariants
            .map((color) => {
              const images = productData?.data?.variantImages[color];
              return images && images.length > 0 ? images[0] : null;
            })
            .filter(Boolean)
        : [];

      formData.append('deleted_variants', JSON.stringify(deletedPaths));

      const finalRetainedVariants = [...retainedVariantData];
      Object.entries(colorImages).forEach(([key, file]) => {
        if (file instanceof File) {
          const color = key.replace('variants_', '');
          if (!finalRetainedVariants.some((item) => item.color === color)) {
            finalRetainedVariants.push({ color, img: [] });
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
        id: productId,
        data: formData,
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to update product');
      }

      toast.success('Product updated successfully!');
      navigate('/manage-products');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.message || 'Error updating product');
    }
  };

  if (singleProductLoading || !productData) {
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
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8}>
            <ProductMediaSection
              loadingVideo={loadingVideo}
              videoPreview={videoPreview}
              handleVideoChange={handleVideoChange}
              showPreview={showPreview}
              colorOptions={colorOptions}
              colorImagePreviews={colorImagePreviews}
              productData={productData}
              handleColorImageChange={handleColorImageChange}
              removeColorImage={removeColorImage}
            />
          </Col>

          <Col xs={24} sm={12} md={12} lg={16}>
            <ProductDetailsSection
              tab={tab}
              setTab={setTab}
              productData={productData}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              isLoading={isLoading}
              navigate={navigate}
            />
          </Col>
        </Row>
      </Form>

      <PreviewModal
        previewVisible={previewVisible}
        previewMedia={previewMedia}
        handlePreviewClose={handlePreviewClose}
      />
    </div>
  );
};

const PreviewModal = ({ previewVisible, previewMedia, handlePreviewClose }) => (
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
      <video width="100%" controls src={imageUrl(previewMedia.url)}></video>
    )}
  </Modal>
);

export default ProductEditing;
