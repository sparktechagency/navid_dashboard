import React, { useState } from "react";
import { Button, notification } from "antd";
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";
// import {
//   useGetConditionsQuery,
//   usePostConditionsMutation,
// } from "../../Redux/api/termsConditionsApis";

const TermsCondition = () => {
  const [content, setContent] = useState("");
  //   const { data, isLoading } = useGetConditionsQuery({});
  //   const [setDescription, { isLoading: isSubmitting }] =
  //     usePostConditionsMutation();

  //   useEffect(() => {
  //     if (data?.data?.description) {
  //       setContent(data.data.description);
  //     }
  //   }, [data]);

  const handleLogContent = async () => {
    try {
      //   await setDescription({ description: content }).unwrap();
      notification.success({
        message: "Success",
        description: "Terms & Conditions updated successfully!",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update Terms & Conditions. Please try again.",
      });
    }
  };

  //   if (isLoading) {
  //     return <p>..loading</p>;
  //   }

  return (
    <>
      {/* heading and back button */}
      <PageHeading text="Terms & Condition" />
      <JoditComponent setContent={setContent} content={content} />

      {/* Button to log content */}
      <Button
        onClick={handleLogContent}
        // disabled={isSubmitting}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
        className="max-w-48 sidebar-button-black"
      >
        {/* {isSubmitting ? "Submitting..." : "Submit"} */}
        Submit
      </Button>
    </>
  );
};

export default TermsCondition;
