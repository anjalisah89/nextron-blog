import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResearchCard from "@/components/ResearchCard";

const Research = () => {
  return (
    <>
      <Head>
        <title>Researches</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
        <link rel="icon" href="/image/logo.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <ResearchCard />
      <Footer />
    </>
  );
};

export default Research;