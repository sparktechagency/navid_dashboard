// import { useState } from 'react'
// import Password from './Password'
// import { Button, Form, Input, message, Upload } from 'antd'
// import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
// import { useNavigate } from 'react-router-dom'
// import profileImage from '../../assets/hye_logo.svg'
// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('profile')
//   const [form] = Form.useForm()
//   const [isEditing, setIsEditing] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [imageLoading, setImageLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     fullName: 'Thuto Makohaone',
//     email: 'thutomakohaone@gmail.com',
//     phone: '+27 55745 2567 125',
//     area: '',
//     building: '',
//     postalCode: '2191',
//     streetAddress: 'Alice Street',
//     pdf: null,
//     image: null,
//   })

//   const handleUpdate = () => {
//     if (isEditing) {
//       form
//         .validateFields()
//         .then((values) => {
//           setFormData({ ...formData, ...values })
//           message.success('Profile updated successfully!')
//           setIsEditing(false)
//         })
//         .catch(() => {
//           message.error('Please complete the form properly.')
//         })
//     } else {
//       setIsEditing(true)
//     }
//   }

//   const handleImageUpload = async (info) => {
//     setImageLoading(true)

//     const uploadedImage = info.file.originFileObj || info.file

//     if (!(uploadedImage instanceof File)) {
//       message.error('Invalid file type. Please upload a valid image.')
//       setImageLoading(false)
//       return
//     }

//     setTimeout(() => {
//       setImageLoading(false)

//       try {
//         const imageURL = URL.createObjectURL(uploadedImage)

//         setFormData({
//           ...formData,
//           image: imageURL,
//         })

//         message.success('Profile image updated successfully!')
//       } catch (error) {
//         console.error('Error creating image URL:', error)
//         message.error('Error displaying image.')
//       }
//     }, 2000)
//   }
//   const navigate = useNavigate()
//   return (
//     <>
//       <div
//         className="flex items-center space-x-2 cursor-pointer mt-5"
//         onClick={() => navigate(-1)}
//       >
//         <h1 className="text-xl font-semibold">← Pro User Manage</h1>
//       </div>
//       <div className=" flex flex-col items-center py-10">
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
//           <div className="flex flex-col items-center">
//             <img
//               src={formData.image ? formData.image : profileImage}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border object-cover"
//             />

//             {isEditing && (
//               <Upload
//                 accept="image/*"
//                 showUploadList={false}
//                 beforeUpload={() => false}
//                 onChange={handleImageUpload}
//                 className="mt-2"
//               >
//                 <Button
//                   icon={
//                     imageLoading ? <LoadingOutlined spin /> : <UploadOutlined />
//                   }
//                 >
//                   {imageLoading ? 'Uploading...' : 'Update Image'}
//                 </Button>
//               </Upload>
//             )}

//             <h2 className="mt-3 text-xl font-semibold">Jerome Smith</h2>
//           </div>

//           <div className="flex justify-center mt-6  ">
//             <button
//               className={`px-4 py-2 cursor-pointer ${
//                 activeTab === 'profile'
//                   ? 'border-b-2 border-[#0D9276] text-[#0D9276]'
//                   : 'text-gray-500'
//               }`}
//               onClick={() => setActiveTab('profile')}
//             >
//               Edit Profile
//             </button>
//             <button
//               className={`px-4 py-2 cursor-pointer ${
//                 activeTab === 'password'
//                   ? 'border-b-2 border-[#0D9276] text-[#0D9276]'
//                   : 'text-gray-500'
//               }`}
//               onClick={() => setActiveTab('password')}
//             >
//               Edit Password
//             </button>
//           </div>

//           {activeTab === 'profile' && (
//             <div className="flex flex-col items-center ">
//               <div className="rounded-lg  w-full max-w-3xl">
//                 <Form form={form} layout="vertical" initialValues={formData}>
//                   <div className="flex flex-col gap-1">
//                     <Form.Item label="First Name" name="first name">
//                       <Input disabled={!isEditing} className="h-[40px]" />
//                     </Form.Item>
//                     <Form.Item label="Last Name" name="last name">
//                       <Input disabled={!isEditing} className="h-[40px]" />
//                     </Form.Item>
//                     <Form.Item label="Email" name="email">
//                       <Input disabled={!isEditing} className="h-[40px]" />
//                     </Form.Item>
//                   </div>

//                   <div className="flex justify-center mt-6">
//                     <Button
//                       type="primary"
//                       onClick={handleUpdate}
//                       disabled={loading}
//                       className="bg-blue-900 text-white rounded-md "
//                     >
//                       {isEditing ? 'Save' : 'Update Now'}
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           )}

//           {activeTab === 'password' && <Password />}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Profile

import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input } from 'antd';
import toast from 'react-hot-toast';

import { IoCameraOutline } from 'react-icons/io5';
import Password from './Password';
import {
  useGetProfileDataQuery,
  useUpdateProfileDataMutation,
} from '../../../Redux/services/profileApis';
import { imageUrl } from '../../../Utils/server';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState();

  const { data: profileData, isLoading } = useGetProfileDataQuery();
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileDataMutation();

  useEffect(() => {
    if (profileData?.data) {
      form.setFieldsValue({
        name: profileData.data.name,
        email: profileData.data.email,
        phone: profileData.data.phone,
      });

      if (profileData.data.img) {
        setImagePreview(`${imageUrl(profileData.data.img)}`);
      }
    }
  }, [profileData, form]);

  if (isLoading) return <p>..loader</p>;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        const values = await form.validateFields();

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('phone', values.phone);

        if (imageFile) {
          formData.append('img', imageFile);
        }

        const response = await updateProfile(formData).unwrap();
        toast.success(response?.message || 'Profile updated successfully!');
        setIsEditing(false);

        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
        }
      } catch (error) {
        if (error?.data?.message) {
          toast.error(error.data.message);
        } else {
          toast.error('Failed to update profile.');
        }
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="shadow-md rounded-lg p-8 w-full max-w-3xl">
        <div className="text-2xl font-bold text-center m-5 mb-7">
          Update Your Profile
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-[140px] h-[140px] mx-auto">
            <input
              type="file"
              onChange={handleImageChange}
              id="img"
              style={{ display: 'none' }}
              accept="image/*"
            />
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={140}
                height={140}
                className="border-2 p-[2px] w-[140px] h-[140px] object-cover rounded-full"
              />
            ) : (
              <div className="w-[140px] h-[140px] bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            <label
              htmlFor="img"
              className={`
                absolute bottom-0 right-0
                bg-[var(--primary-color)]
                rounded-full
                w-10 h-10
                flex items-center justify-center
                cursor-pointer
                ${!isEditing && 'pointer-events-none opacity-50'}
              `}
            >
              <div className="bg-yellow p-2 rounded-full">
                <IoCameraOutline className="text-4xl bg-white p-1 rounded-full hover:bg-gray-300" />
              </div>
            </label>
          </div>

          <h2 className="mt-3 text-xl font-semibold">
            {profileData?.data?.name || ''}
          </h2>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-800 text-blue-800'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 cursor-pointer ${
              activeTab === 'password'
                ? 'border-b-2 border-blue-800 text-blue-800'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="flex flex-col items-center">
            <div className="rounded-lg w-full max-w-3xl">
              <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ message: 'Please enter your name' }]}
                >
                  <Input disabled={!isEditing} className="h-[40px]" />
                </Form.Item>

                <Form.Item label="Email" name="email">
                  <Input disabled className="h-[40px]" />
                </Form.Item>

                <Form.Item
                  label="Contact Number"
                  name="phone"
                  rules={[
                    {
                      message: 'Please enter your phone number',
                    },
                  ]}
                >
                  <Input disabled={!isEditing} className="h-[40px]" />
                </Form.Item>

                <div className="flex justify-center mt-6">
                  <Button
                    type="primary"
                    onClick={handleUpdate}
                    loading={updateLoading}
                  >
                    {isEditing ? 'Save' : 'Update Now'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}

        {activeTab === 'password' && <Password />}
      </div>
    </div>
  );
};

export default Profile;
