import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import AccordionSection from "@/components/Accordion";
import TopButton from "@/components/TopButton";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Head>
        <title>Nextron - Tech Blogs</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
        <link rel="icon" href="/image/logo.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="text-center mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              About Nextron Blog
            </h1>
            <p className="text-start leading-relaxed lg:px-16 px-5 mx-auto">
              Welcome to Nextron Coding Blog, your ultimate resource for
              cutting-edge coding knowledge and insights! Our platform is
              dedicated to bringing you the latest trends, best practices, and
              comprehensive tutorials in web development, programming and
              software engineering. Stay updated with the latest in coding and
              development by following Nextron Coding Blog. Whether you{"'"}re a
              beginner looking to learn or an experienced developer aiming to
              stay ahead of the curve, our blog has something for everyone.
              <br /> At Nextron, we believe in fostering a community where
              developers can share, learn, and grow together. Our blog features
              a variety of content including categorized posts, featured
              articles, and in-depth research papers to cater to developers of
              all levels.We believe in the power of community and welcome
              contributions from developers around the world. If you have
              valuable insights, tutorials, or research to share, we{"'"}d love
              to feature your work on our blog.
            </p>
          </div>
          <h4 className="text-xl text-center font-medium  text-gray-900 mb-4">
            What We Offer
          </h4>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-pink-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Informative Blog Posts
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-pink-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Featured Articles
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-pink-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Research Papers and Reports
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-pink-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Project-Based Learning
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-pink-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Resource Requests
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-pink-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Advanced Techniques
                </span>
              </div>
            </div>
          </div>
          <h4 className="text-xl text-center font-medium  text-gray-900 mb-4 mt-10">
            Our Mission
          </h4>
          <p className="text-start leading-relaxed lg:px-16 px-5 mx-auto">
            At Nextron Coding Blog, our mission is to empower developers with
            the knowledge and tools they need to excel in their careers. We
            strive to provide high-quality, accessible, and up-to-date content
            that helps developers at all stages of their journey. Whether you
            {"'"}re looking to learn new skills, stay updated with the latest
            trends, or contribute to the community, Nextron Coding Blog is here
            to support you. <br />
            Thank you for being a part of our journey. Let{"'"}s code the future
            together!
          </p>
        </div>
      </section>
      <div className="mb-10 mt-5">
        <h4 className="text-xl text-center font-medium  text-gray-900 mb-5">
          Frequently Asked Questions (FAQs)
        </h4>
        <AccordionSection />
      </div>
      <TopButton />
      <Footer />
    </>
  );
};

export default About;
