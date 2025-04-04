import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => (
  <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-4">
    <div className="relative overflow-hidden shadow-md mb-6">
      {post.featuredImage.url ? (
        <Image
          unoptimized
          fetchpriority="high"
          src={post.featuredImage.url}
          alt="Image"
          className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          height={60}
          width={60}
        />
      ) : null}
    </div>
    <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
      <Link href={`/post/${post.slug}`}>{post.title}</Link>
    </h1>
    <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
      <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
        {post?.author?.photo?.url ? (
          <Image
            unoptimized
            fetchpriority="high"
            alt={post?.author?.name}
            height={30}
            width={30}
            className="align-middle rounded-full"
            src={post?.author?.photo?.url}
          />
        ) : null}
        <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
          {post?.author?.name ? post?.author?.name : "Anonymous"}
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
          Published: {moment(post.createdAt).format("MMM DD, YYYY")}
        </span>
      </div>
    </div>
    <p className="text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8 text-center">
      {post.excerpt.split(" ").slice(0, 10).join(" ") +
        (post.excerpt.split(" ").length > 10 ? "..." : "")}
    </p>
    <div className="text-center">
      <Link href={`/post/${post.slug}`}>
        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
          Read More
        </span>
      </Link>
    </div>
  </div>
);

export default PostCard;
