import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
const PageHeading = ({ text, content }) => {
  const navigate = useNavigate();
  return (
    <div className="start-center gap-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title className="text-white">{text}</title>
        <meta name="description" content={content || ""} />
      </Helmet>
      <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
        <button className="text-[#222] bg-[var(--black-600)] p-2 rounded-md text-2xl">
          <IoMdArrowBack />
        </button>
        <p className="text-lg font-medium text-[#222]">{text}</p>
      </div>
    </div>
  );
};

export default PageHeading;
