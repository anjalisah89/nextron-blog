import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import { getcontactDetails } from "@/services";

const Contact = () => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    comment: "",
  });

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const { email, name, comment } = formData;

    // if (!email || !name || !comment) {
    //   setError(true);
    //   Swal.fire("Oops", "Please Enter Details", "error");
    //   return;
    // }
    if (!email) {
      setError(true);
      Swal.fire("Ohh oh", "Email is required", "error");
      return;
    }
    if (!name) {
      setError(true);
      Swal.fire("Hii there", "Please enter your name ");
      return;
    }
    if (!comment) {
      setError(true);
      Swal.fire("Please share your thoughts!");
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire("Please enter a valid email address");
      return;
    }

    const contactDetails = { email, name, comment };

    getcontactDetails(contactDetails)
      .then((res) => {
        if (res.success) {
          setFormData({ email: "", name: "", comment: "" });
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        } else {
          Swal.fire(
            "Error",
            res.message || "Failed to submit contact details",
            "error"
          );
        }
      })
      .catch(() => {
        setError(true);
        Swal.fire("Error", "Failed to submit contact details", "error");
      });
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
        <link rel="icon" href="/image/logo.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <section className="text-black body-font relative">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Have a question, suggestion, or need support? We{"'"}re here to
              help! Whether you{"'"}re experiencing an issue with the app, have
              feedback about our content or want to collaborate with us, we
              {"'"}d love to hear from you.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-black"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-600 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-black"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-600 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="comment"
                      className="leading-7 text-sm text-black"
                    >
                      Message
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-600 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    className="flex mx-auto text-white bg-pink-600 border-0 py-2 px-8 focus:outline-none hover:bg-pink-800 rounded text-lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  {showSuccessMessage && (
                    <span className="text-xl float-right font-semibold mt-3 text-Black">
                      Thank you for reaching out to us. We have received your
                      message!!
                    </span>
                  )}
                </div>
                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                  <Link
                    href={"https://github.com/anjalisah89"}
                    className="image-container"
                  >
                    <Image
                      unoptimized
                      alt="image"
                      height={60}
                      width={60}
                      className="rounded-full"
                      src={
                        "https://avatars.githubusercontent.com/u/115478181?s=400&u=fc674d0b90670304ef08b69142a3723f9d1faa60&v=4"
                      }
                    />
                  </Link>
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm mt-4">
                    ANJALI SAH
                  </h2>
                  <p className="text-gray-800 text-sm">Software Developer</p>
                  <span className="inline-block h-1 w-10 rounded bg-pink-600 mb-2 mt-4"></span>
                  <p className="text-black hover:text-pink-600">
                    anjalisah89@gmail.com
                  </p>
                  <p className="leading-normal">India</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
