import React from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Header />
      <div className="error-page py-12">
        <h1 data-h1="404">404</h1>
        <p data-p="Oops!! Page not found" className="mb-24">
          Oops!! Page not found
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Custom404;
