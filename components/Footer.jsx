import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { submitNewsletter } from "@/services";

const Footer = () => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setError(false);
    const { email } = formData;
    if (!email) {
      setError(true);
      Swal.fire("Error", "Email is required", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire("Error", "Please enter a valid email address", "error");
      return;
    }

    const NewsObj = { email };

    submitNewsletter(NewsObj)
      .then((res) => {
        if (res.success) {
          setFormData({ email: "" });
          setShowSuccessMessage(true);
          // Swal.fire(
          //   "Success",
          //   "You are subscribed to the newsletter",
          //   "success"
          // );
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        } else {
          Swal.fire("Error", res.message || "Failed to subscribe", "error");
        }
      })
      .catch(() => {
        setError(true);
        Swal.fire("Error", "Failed to submit newsletter", "error");
      });
  };

  return (
    <div className="text-black body-font mt-4">
      <div className="border-t border-gray-200">
        <div className="container px-5 py-8 flex flex-wrap mx-auto items-center">
          <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
            <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
              <label
                htmlFor="footer-field"
                className="leading-7 text-sm text-black"
              >
                Enter your email
              </label>
              <input
                type="text"
                id="footer-field"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-pink-200 focus:border-pink-600 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              className="inline-flex text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-pink-800 rounded"
              type="button"
              onClick={handleSubmit}
            >
              Subscribe
            </button>
            <p className="text-black text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">
              Never miss a beat!
              <br />
              Subscribe for the latest articles, reviews and tech insights
              straight to your inbox.
            </p>
            {showSuccessMessage && (
              <span className="text-xl float-right font-semibold mt-3 text-green-500">
                Congratulations! You are subscribed to the newsletter.
              </span>
            )}
            {error && (
              <span className="text-xl float-right font-semibold mt-3 text-red-500">
                Please enter a valid email address.
              </span>
            )}
          </div>
          <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
            <Link href={"/"} className="text-black">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>
            <Link href={"/"} className="ml-3 text-black">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </Link>
            <Link href={"/"} className="ml-3 text-black">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>
            <Link href={"/"} className="ml-3 text-black">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </Link>
          </span>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-black text-sm text-center sm:text-left">
            © 2024 Nextron Blog — Managed by Anjali |
            <Link
              href="#"
              className="text-black ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @anjalisah89
            </Link>
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-black text-sm">
            Contact for more information.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
