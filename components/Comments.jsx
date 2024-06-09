import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "@/services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, [slug]);

  return (
    <>
      {comments !== null && comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} {comments?.length > 0 ? "Comment" : "Comments"}
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}

      {comments === null && (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comments</h3>
          <div className="border-b border-gray-100">
            <span className="font-semibold">No comments yet.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
