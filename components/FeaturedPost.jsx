import React from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

const FeaturedPost = ({ featuredPosts }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container lg:px-10 px-5 mx-auto mt-4">
        <div className="flex flex-wrap -m-4 mb-4">
          {featuredPosts &&
            featuredPosts.map((post, index) => (
              <div key={index} className="p-4 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 bg-opacity-75 pb-10 rounded-lg overflow-hidden text-center relative">
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
                  <div className="px-12 mt-12">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      Published: {moment(post.createdAt).format("MMM DD, YYYY")}
                    </h2>
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {post.title}
                    </h1>
                    <p className="leading-relaxed mb-3">
                      {post.excerpt.split(" ").slice(0, 10).join(" ") +
                        (post.excerpt.split(" ").length > 10 ? "..." : "")}
                    </p>
                    <Link
                      href={`/post/${post.slug}`}
                      className="text-pink-600 inline-flex items-center"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
