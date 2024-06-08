import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getPosts, getPostDetails } from "@/services";
import Head from "next/head";
import Header from "@/components/Header";
import PostDetail from "@/components/PostDetails";
import Categories from "@/components/Categories";
import PostWidget from "@/components/PostWidget";
import Author from "@/components/Author";
import CommentsForm from "@/components/CommentsForm";
import Comments from "@/components/Comments";
import Footer from "@/components/Footer";

const PostDetails = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post?.title ? post.title : "Post"}</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
        <link rel="icon" href="/image/logo.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            {post?.author ? <Author author={post.author} /> : null}
            {post?.slug ? <CommentsForm slug={post.slug} /> : null}
            {post?.slug ? <Comments slug={post.slug} /> : null}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  if (!endpoint) {
    console.error("GraphCMS endpoint is not defined");
    return {
      props: {
        posts: [],
      },
    };
  }
  const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
  });

  try {
    const { data } = await client.query({
      query: getPostDetails,
      variables: { slug: params.slug },
    });
    // console.log("data", data);

    return {
      props: {
        post: data?.post ?? [],
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: {
        post: [],
      },
    };
  }
}

export async function getStaticPaths() {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
  const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
  });
  try {
    const { data } = await client.query({ query: getPosts });
    const paths = data.postsConnection.edges.map(({ node }) => ({
      params: { slug: node.slug },
    }));
    return {
      paths: paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error in getStaticPaths Check Endpoint:", error.message);
    return {
      paths: [],
      fallback: false,
    };
  }
}
