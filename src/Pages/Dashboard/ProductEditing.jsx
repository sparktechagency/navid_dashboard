import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Form, Row, Col, Modal, Spin, message } from 'antd';
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
import { colorOptions } from './color';

const ProductEditing = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.state;
  const urlObjectsRef = useRef([]);

  const { data: productData, isLoading: singleProductLoading } =
    useSingleProductGetQuery({ id: productId });
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [isWholesale, setIsWholesale] = useState(true);
  const [categoryId, setCategoryId] = useState(null);

  const [mediaState, setMediaState] = useState({
    video: {
      file: null,
      preview: null,
      existingPath: null,
      markedForDeletion: false,
      isLoading: false,
    },

    variants: {
      data: {},

      retained: [],
      deleted: [],
    },
  });

  const [previewModal, setPreviewModal] = useState({
    visible: false,
    media: { type: null, url: null, title: null },
  });

  useEffect(() => {
    if (!productData?.data) return;

    const { data } = productData;
    console.log(data);
    form.setFieldsValue({
      category: data?.category?._id,
      name: data?.name,
      price: data?.price,
      quantity: data?.quantity,
      description: data?.description,
      whole_sale: data?.whole_sale,
      previous_price: data?.previous_price,
    });

    setIsWholesale(data.whole_sale ?? true);
    setCategoryId(data.category?._id);

    if (data.variantImages) {
      const variantsData = {};
      const retainedVariants = [];

      Object.entries(data.variantImages).forEach(([color, images]) => {
        if (color === 'video') return;

        if (images && images.length > 0) {
          const colorKey = color.toLowerCase();
          const imagePath = images[0];
          const imagePreviewUrl = imagePath.startsWith('http')
            ? imagePath
            : `https://api.divandioneapp.com/${imagePath}`;

          variantsData[colorKey] = {
            file: null,
            preview: imagePreviewUrl,
            existingPath: imagePath,
            markedForDeletion: false,
          };

          retainedVariants.push({
            color: colorKey,
            img: [imagePath],
          });
        }
      });

      const videoPath = data?.variantImages.video?.[0];
      const videoPreview = videoPath
        ? `https://api.divandioneapp.com/${videoPath}`
        : null;

      setMediaState((prev) => ({
        video: {
          ...prev.video,
          preview: videoPreview,
          existingPath: videoPath,
          markedForDeletion: false,
        },
        variants: {
          data: variantsData,
          retained: retainedVariants,
          deleted: [],
        },
      }));
    }
  }, [productData, form]);

  useEffect(() => {
    return () => {
      urlObjectsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleVideoChange = useCallback((info) => {
    if (!info.file) return;

    setMediaState((prev) => ({
      ...prev,
      video: { ...prev.video, isLoading: true },
    }));

    try {
      const videoURL = URL.createObjectURL(info.file);
      urlObjectsRef.current.push(videoURL);

      setMediaState((prev) => ({
        ...prev,
        video: {
          file: info.file,
          preview: videoURL,
          existingPath: prev.video.existingPath,
          markedForDeletion: false,
          isLoading: false,
        },
      }));
    } catch (error) {
      toast.error('Error processing video file');
      setMediaState((prev) => ({
        ...prev,
        video: { ...prev.video, isLoading: false },
      }));
    }
  }, []);

  const handleColorImageChange = useCallback((info, color) => {
    if (!info.file) return;

    try {
      const colorKey = color.toLowerCase();

      if (info.file.size > 5 * 1024 * 1024) {
        toast.error(`Image for ${color} is too large. Maximum size is 5MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setMediaState((prev) => {
          const updatedVariants = { ...prev.variants };

          updatedVariants.data = {
            ...updatedVariants.data,
            [colorKey]: {
              file: info.file,
              preview: reader.result,
              existingPath: null,
              markedForDeletion: false,
            },
          };

          updatedVariants.deleted = updatedVariants.deleted.filter(
            (c) => c !== colorKey
          );

          if (!updatedVariants.retained.some((v) => v.color === colorKey)) {
            updatedVariants.retained = [
              ...updatedVariants.retained,
              { color: colorKey, img: [] },
            ];
          }

          return { ...prev, variants: updatedVariants };
        });
      };

      reader.readAsDataURL(info.file);
    } catch (error) {
      toast.error(`Error processing image for ${color}`);
    }
  }, []);

  const removeColorImage = useCallback((color) => {
    const colorKey = color.toLowerCase();

    setMediaState((prev) => {
      const updatedVariants = { ...prev.variants };
      const variantData = { ...updatedVariants.data };

      if (variantData[colorKey]?.existingPath) {
        updatedVariants.deleted = [...updatedVariants.deleted, colorKey];
      }

      updatedVariants.retained = updatedVariants.retained.filter(
        (v) => v.color !== colorKey
      );

      delete variantData[colorKey];
      updatedVariants.data = variantData;

      return { ...prev, variants: updatedVariants };
    });
  }, []);

  const removeVideo = useCallback(() => {
    setMediaState((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        file: null,
        preview: null,
        markedForDeletion: prev.video.existingPath !== null,
      },
    }));
  }, []);

  const showPreview = useCallback((type, url, title) => {
    setPreviewModal({
      visible: true,
      media: { type, url, title },
    });
  }, []);

  const handlePreviewClose = useCallback(() => {
    setPreviewModal((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      formData.append('id', productData?.data?._id);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', categoryId);
      formData.append('quantity', values.quantity);
      formData.append('whole_sale', values.whole_sale);
      formData.append('previous_price', values.previous_price);

      const deletedPaths = mediaState.variants.deleted
        .map((colorKey) => {
          const variantImg = productData?.data?.variantImages?.[colorKey];
          return variantImg && variantImg.length > 0 ? variantImg[0] : null;
        })
        .filter(Boolean);

      formData.append('deleted_variants', JSON.stringify(deletedPaths));

      if (mediaState.video.markedForDeletion && mediaState.video.existingPath) {
        formData.append(
          'deleted_video',
          JSON.stringify([mediaState.video.existingPath])
        );
      }

      formData.append(
        'retained_variants',
        JSON.stringify(mediaState.variants.retained)
      );

      if (mediaState.video.file) {
        formData.append('variants_video', mediaState.video.file);
      }

      Object.entries(mediaState.variants.data).forEach(([colorKey, data]) => {
        if (data.file) {
          formData.append(`variants_${colorKey}`, data?.file);
        }
      });

      updateProduct({ id: productId, data: formData })
        .unwrap()
        .then((res) => {
          if (res?.data?.success) {
            toast.success(res?.data?.message || 'Product updated successfully');
            navigate('/manage-products');
          }
        });
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
              removeVideo={removeVideo}
              videoFile={mediaState.video.file}
              loadingVideo={mediaState.video.isLoading}
              videoPreview={mediaState.video.preview}
              handleVideoChange={handleVideoChange}
              showPreview={showPreview}
              colorOptions={colorOptions}
              colorImagePreviews={Object.fromEntries(
                Object.entries(mediaState.variants.data).map(
                  ([color, data]) => [`variants_${color}`, data?.preview]
                )
              )}
              productData={productData}
              handleColorImageChange={handleColorImageChange}
              removeColorImage={removeColorImage}
            />
          </Col>

          <Col xs={24} sm={12} md={12} lg={16}>
            <ProductDetailsSection
              tab={isWholesale}
              setTab={setIsWholesale}
              productData={productData}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              isLoading={isUpdating}
              navigate={navigate}
            />
          </Col>
        </Row>
      </Form>

      <PreviewModal
        previewVisible={previewModal.visible}
        previewMedia={previewModal.media}
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
      <video width="100%" controls src={previewMedia.url}></video>
    )}
  </Modal>
);

export default ProductEditing;
