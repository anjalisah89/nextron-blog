import Head from "next/head";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import PostCard from "@/components/PostCard";
import PostWidget from "@/components/PostWidget";
import FeaturedPosts from "@/components/FeaturedPosts";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getPosts } from "@/services";
import TopButton from "@/components/TopButton";
import Footer from "@/components/Footer";

export default function Articles({ posts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Articles</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
        <link rel="icon" href="/image/logo.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <div className="container mx-auto lg:px-10 px-5 mb-8">
        <div className="flex flex-col text-center w-full lg:mb-5 mt-5">
          <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1">
            Most Viewed
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Featured Articles
          </h1>
        </div>
        <FeaturedPosts />
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 col-span-1 lg:mt-4 mt-8 rounded-lg">
            <div className="flex flex-col text-center w-full mb-5">
              <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1">
                1 min Read
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-2">
                Trending Articles
              </h1>
            </div>
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1 lg:mb-4 mb-16">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
      <TopButton />
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
