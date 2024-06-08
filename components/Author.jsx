import React from "react";
import Image from "next/image";

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    <div className="absolute left-0 right-0 -top-14">
      {author.photo.url ? (
        <Image
          unoptimized
          alt={author.name}
          height={100}
          width={100}
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      ) : null}
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">
      {author.name ? author.name : "Anonymous"}
    </h3>
    <p className="text-white text-ls">
      {author.bio ? author.bio : "No info about this author"}
    </p>
  </div>
);

export default Author;
