import React, { useState, useEffect } from "react";
import moment from "moment";
import Image from "next/image";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism.css";
// import "prismjs/themes/prism-okaidia.css";
// import "prismjs/themes/prism-funky.css";
// import "prismjs/themes/prism-coy.css";
// import "prismjs/themes/prism-solarized-dark.css";

const PostDetail = ({ post }) => {
  const [copyStatus, setCopyStatus] = useState("");
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied");

      setTimeout(() => {
        setCopyStatus("");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err);
      setCopyStatus("Copy failed");
    }
  };

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }
      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }
      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText}
          </h4>
        );
      case "image":
        return (
          <div key={index} className="flex justify-center mb-8">
            <Image
              unoptimized
              alt={obj.title || "Image"}
              height={obj.height || 400}
              width={obj.width || 800}
              src={obj.src}
              className="rounded"
            />
          </div>
        );
      case "code-block":
        return (
          <div key={index} className="relative rounded-md">
            <button
              onClick={() => copyToClipboard(text)}
              className="absolute top-5 right-5 bg-pink-600 hover:bg-blue-800 text-white py-1 px-2 rounded-md"
            >
              {copyStatus === "Copied" ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code className="language-javascript">{text}</code>
            </pre>
          </div>
        );
      default:
        return modifiedText;
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 lg:mt-4 mt-4">
      <div className="relative overflow-hidden shadow-md mb-6">
        {post?.featuredImage?.url && (
          <Image
            unoptimized
            src={post.featuredImage.url}
            alt="Featured Image"
            height={60}
            width={60}
            className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        )}
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            {post?.author?.photo?.url && (
              <Image
                alt={post?.author?.name || "Author"}
                height={30}
                width={30}
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
            )}
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {post?.author?.name || "Anonymous"}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              Published: {moment(post?.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">
          {post?.title || "Oops!! Something went wrong."}
        </h1>
        {post?.content?.raw?.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item, item.type)
          );

          return (
            <React.Fragment key={index}>
              {getContentFragment(index, children, typeObj, typeObj.type)}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PostDetail;
