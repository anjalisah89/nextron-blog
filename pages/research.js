import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResearchPost from "@/components/ResearchPost";
import { useState, useEffect } from "react";
import { getResearchPosts } from "@/services";

const Research = () => {
  const [researchPosts, setResearchPosts] = useState([]);

  useEffect(() => {
    const fetchResearchPosts = async () => {
      const result = await getResearchPosts();
      // console.log("ResearchPosts", result);
      if (result && result.length > 0) {
        setResearchPosts(result);
      } else {
        console.error("No featured posts retrieved");
      }
    };

    fetchResearchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Researches</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
      </Head>
      <Header />
      <div className="flex flex-col text-center w-full lg:mb-8 mt-5">
        <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1">
          Most Viewed
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Explore Our Research Articles
        </h1>
        <p className="leading-relaxed px-12 mt-4 text-center">
          Research articles on coding and programming technologies explore
          advancements, methodologies and innovations in software development.
          Topics include new programming languages, efficient algorithms,
          software engineering practices like agile and DevOps, cybersecurity,
          AI applications, JavaScript programming, Docker for containerization,
          MongoDB as a NoSQL database, React library for UI development &
          NextJS, AWS cloud services, Cloud Computing, frontend-backend
          integration techniques, GraphQL API implementation, user experience
          design, educational methods and ethical considerations. These articles
          are essential for researchers, practitioners and educators in
          understanding and advancing the field, often published in academic
          journals and conferences.
        </p>
      </div>
      <ResearchPost researchPosts={researchPosts} />
      <Footer />
    </>
  );
};

export default Research;
