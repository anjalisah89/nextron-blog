import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <div>Research</div>
      <Footer />
    </>
  );
};

export default Research;