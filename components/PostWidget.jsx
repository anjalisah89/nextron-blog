import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

// import { grpahCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from "@/services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        4;
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [categories, slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mt-4 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {slug
        ? relatedPosts.map((post, index) => (
            <div key={index} className="flex items-center w-full mb-4">
              <div className="w-16 flex-none">
                <Image
                  // loader={grpahCMSImageLoader}
                  alt={post.title}
                  height={60}
                  width={60}
                  unoptimized
                  className="align-middle rounded-full"
                  src={post.featuredImage.url}
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-500 text-xs">
                  {moment(post.createdAt).format("MMM DD, YYYY")}
                </p>
                <Link href={`/post/${post.slug}`} className="text-md">
                  {post.title}
                </Link>
              </div>
            </div>
          ))
        : "No Posts Available"}
    </div>
  );
};

export default PostWidget;
