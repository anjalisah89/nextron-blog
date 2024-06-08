import Head from "next/head";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import PostCard from "@/components/PostCard";
import PostWidget from "@/components/PostWidget";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getPosts } from "@/services";
import Footer from "@/components/Footer";

export default function Blogs({ posts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
        <link rel="icon" href="/image/logo.svg" type="image/svg+xml" />
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
      <Footer />
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
    const { data } = await client.query({ query: getPosts });
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
