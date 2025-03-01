import React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ProfileEdit from "../../Components/ProfilePage/ProfileEdit.jsx";
import ChangePassword from "../../Components/ProfilePage/ChangePassword.jsx";
// import { useGetProfileDataQuery } from "../../Redux/api/profileApis";
import { imageUrl } from "../../Utils/server";
import { Button, Spin } from "antd";

const Tabs = ["Edit Profile", "Change Password"];

const Profile = () => {
  const [tab, setTab] = useState(Tabs[0]);
  //   const { data, isLoading } = useGetProfileDataQuery({});
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  //   if (isLoading) {
  //     return <Spin />;
  //   }
  const data = {
    data: {
      authId: {
        name: "John Doe",
      },
      profile_image: "https://placehold.co/400",
    },
  };

  const profileImage = image
    ? URL.createObjectURL(image)
    : data?.data?.profile_image
    ? imageUrl(data.data.profile_image)
    : "/path/to/default-image.jpg";

  return (
    <>
      {/* Profile Image Section */}
      <div className="max-w-[700px] mx-auto  p-4 rounded-md">
        <div className="w-full center-center">
          <div onClick={() => document.getElementById("fileInput")?.click()} className="w-24 h-24 border-2 border-black p-1 cursor-pointer rounded-full relative">
            <img
              className="w-full h-full object-cover rounded-full"
              src={profileImage}
              alt="Profile"
            />
            {tab === "Edit Profile" && (
              <button
                onClick={() => document.getElementById("fileInput")?.click()}
                aria-label="Edit Profile Picture"
                className="absolute right-0 bottom-2"
              >
                <FaEdit size={24} className="text-black cursor-pointer" />
              </button>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <p className="text-2xl text-center text-black mt-2">
          {data?.data?.authId?.name || "User Name"}
        </p>
      </div>

      {/* Tabs Section */}
      <div className="w-full center-center my-3">
        {Tabs.map((item) => (
          <Button
            key={item}
            style={{ width: "200px", justifyContent: "center" }}
            className={`${
              item === tab
                ? "!border-0 !rounded-none !font-semibold !text-[#3872F0] !border-b-2 !border-black !bg-transparent"
                : "!border-0 !rounded-none !text-black !border-b-1 !border-black !bg-transparent"
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      {/* Content Section (ProfileEdit or ChangePassword) */}
      <div className="max-w-[700px] mx-auto bg-[var(--black-200)] p-4 rounded-md">
        {tab === "Edit Profile" ? (
          <ProfileEdit
            image={image}
            defaultImage={profileImage}
            data={data?.data}
          />
        ) : (
          <ChangePassword />
        )}
      </div>
    </>
  );
};

export default Profile;
