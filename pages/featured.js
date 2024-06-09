import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedPost from "@/components/FeaturedPost";
import { useState, useEffect } from "react";
import { getFeaturedPosts } from "@/services";

const Featured = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      const result = await getFeaturedPosts();
      console.log("FeaturedPosts", result);
      if (result && result.length > 0) {
        setFeaturedPosts(result);
      } else {
        console.error("No featured posts retrieved");
      }
    };

    fetchFeaturedPosts();
  }, []);
  
  return (
    <>
      <Head>
        <title>Featured Posts</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
      </Head>
      <Header />
      <FeaturedPost featuredPosts={featuredPosts} />
      <Footer />
    </>
  );
};

export default Featured;
