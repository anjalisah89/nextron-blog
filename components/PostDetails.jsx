import React from "react";
import moment from "moment";
import Image from "next/image";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const PostDetail = ({ post }) => {
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
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            unoptimized
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      case "code-block":
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-md mb-4">
            <code className="language-javascript">{modifiedText}</code>
          </pre>
        );
      default:
        return modifiedText;
    }
  };

  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 lg:mt-4 mt-4">
      <div className="relative overflow-hidden shadow-md mb-6">
        {post?.featuredImage?.url ? (
          <Image
            unoptimized
            src={post?.featuredImage?.url}
            alt=""
            height={60}
            width={60}
            className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        ) : null}
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            {post?.author?.photo?.url ? (
              <Image
                alt={post?.author?.name || "Author"}
                height={30}
                width={30}
                className="align-middle rounded-full"
                src={post?.author?.photo?.url}
              />
            ) : null}
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {post.author.name ? post.author.name : "Anonymous"}
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
          {post?.title ? post?.title : "Oops!! Something went wrong."}
        </h1>
        {post?.content?.raw?.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item, item.type)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
