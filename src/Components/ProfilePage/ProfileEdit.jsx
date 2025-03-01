import { Button, Form } from "antd";
import React from "react";
// import { userProfileFieldType } from "../../Types/DataTypes";
// import { useUpdateProfileDataMutation } from "../../Redux/api/profileApis";

const ProfileEdit = ({ image, data }) => {
  const [form] = Form.useForm();
  //   const [setProfileUpdate, { isLoading: isProfileUpdate }] =
  //     useUpdateProfileDataMutation();
  const onFinish = async (values) => {
    const updateData = {
      name: values.name,
      email: values.email,
      address: values.address,
      phoneNumber: values.phoneNumber,
      image,
    };
    console.log(updateData);

    // const formData = new FormData();
    // Object.keys(updateData)?.map((key) => {
    //   formData.append(key, updateData);
    // });

    // if (image) {
    //   formData.append("profile_image", image);
    // }
    // try {
    //   await setProfileUpdate(formData);
    //   message.success("Profile updated successfully!");
    // } catch (error) {
    //   console.error("Failed to update profile:", error);
    // }
  };

  return (
    <div>
      <p className="text-[#3872F0] text-3xl text-center">Edit Profile</p>
      <Form
        className="text-white"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: data?.name || "",
          email: data?.email || "",
          phoneNumber: data?.phoneNumber || "",
          address: data?.address || "",
        }}
      >
        <Form.Item
          name="name"
          label={<span className="text-black">Name</span>}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <input
            style={{
              width: "100%",
              height: 40,
              border: "none",
              borderRadius: "5px",
              color: "#111",
              backgroundColor: "#fff",
              outline: "none",
            }}
            placeholder="Name"
            className=" p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-black">Email</span>}
        >
          <input
            style={{
              width: "100%",
              height: 40,
              border: "none",
              borderRadius: "5px",
              color: "#111",
              backgroundColor: "#fff",
              outline: "none",
            }}
            disabled
            type="email"
            placeholder="Email"
            className="cursor-not-allowed  p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={<span className="text-black">Phone Number</span>}
          rules={[
            {
              required: true,
              message: "Phone number is required",
            },
          ]}
        >
          <input
            style={{
              width: "100%",
              height: 40,
              border: "none",
              borderRadius: "5px",
              color: "#111",
              backgroundColor: "#fff",
              outline: "none",
            }}
            placeholder="Phone Number"
            className=" p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label={<span className="text-black">Address</span>}
          rules={[
            {
              required: true,
              message: "Address is required",
            },
          ]}
        >
          <input
            style={{
              width: "100%",
              height: 40,
              border: "none",
              borderRadius: "5px",
              color: "#111",
              backgroundColor: "#fff",
              outline: "none",
            }}
            placeholder="Address"
            className=" p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          // disabled={isProfileUpdate}
          className="!bg[#3872F0]] !hover:bg-[#3872F0] active:bg-[#3872F0] w-full"
        >
          {/* {isProfileUpdate ? <Spin /> : "Update Profile"} */}
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
