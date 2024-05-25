import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import PostCard from "@/components/PostCard";
import PostWidget from "@/components/PostWidget";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_POSTS } from "@/services/index";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Nextron Blog</title>
      </Head>
      <Header />
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1 mt-4 rounded-lg">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
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
    const { data } = await client.query({ query: GET_POSTS });
    // console.log("data", data);

    return {
      props: {
        posts: data.postsConnection.edges ?? [],
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: {
        posts: [],
      },
    };
  }
}
