import React, { useState, useEffect } from "react";
import { submitComment } from "@/services";
import Swal from "sweetalert2";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData = {
      name: window.localStorage.getItem("name") || "",
      email: window.localStorage.getItem("email") || "",
      storeData:
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email"),
    };
    setFormData(initialFormData);
  }, []);

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  const handleChange = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;

    if (!name) {
      setError(true);
      Swal.fire("Error", "Please enter your name", "error");
      return;
    }

    if (!email) {
      setError(true);
      Swal.fire("Error", "Email is required", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      setError(true);
      Swal.fire("Error", "Please enter a valid email address", "error");
      return;
    }

    if (!comment) {
      setError(true);
      Swal.fire("Error", "Please share your thoughts!", "error");
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          setFormData({
            ...formData,
            name: "",
            email: "",
            comment: "",
          });
        }
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        Swal.fire("Error", res.message || "Failed to submit comment", "error");
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Comment Your Thoughts
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={handleChange}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={handleChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {/* {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )} */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="transition duration-500 ease hover:bg-blue-800 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
      </div>
      <div className="mt-8">
        {showSuccessMessage && (
          <span className="text-sm font-semibold text-black">
            Thanks!! Your Comment has been submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
