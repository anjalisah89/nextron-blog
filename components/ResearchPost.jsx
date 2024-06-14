import React from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

const ResearchPost = ({ researchPosts }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="flex w-full justify-center items-end ">
        <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left mb-8">
          <input
            type="text"
            id="hero-field"
            name="hero-field"
            placeholder="Discover more..."
            className="w-full bg-white bg-opacity-50 rounded focus:ring-2 focus:ring-pink-200 focus:bg-transparent border border-gray-300 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button className="inline-flex text-white bg-pink-500 border-0 mb-8 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
          Search
        </button>
      </div>
      <div className="container lg:px-10 px-5 mx-auto mt-4">
        <div className="flex flex-wrap -m-4 mb-4">
          {researchPosts &&
            researchPosts.map((post, index) => (
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
                  <div className="px-12 mt-8">
                    <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto ">
                      <Image
                        unoptimized
                        fetchpriority="high"
                        alt={post.author.name}
                        height={30}
                        width={30}
                        className="align-middle rounded-full"
                        src={post.author.photo.url}
                      />
                      <p className="inline align-middle text-black ml-2 font-medium text-lg">
                        {post.author.name ? post.author.name : "Anonymous"}
                      </p>
                    </div>
                    <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1 mt-2">
                      Published: {moment(post.createdAt).format("MMM DD, YYYY")}
                    </h2>
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-black mb-3 mt-3">
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

export default ResearchPost;
