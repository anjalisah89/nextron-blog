import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import PostCard from "@/components/PostCard";
import PostWidget from "@/components/PostWidget";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getPosts } from "@/services";
import FeaturedPosts from "@/components/FeaturedPosts";
import Footer from "@/components/Footer";

export default function Home({ posts }) {
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
      <div className="container mx-auto lg:px-10 mt-4">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 lg:py-10 mb-10 items-center justify-center flex-col">
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Destination for Tech Insights and Innovations
              </h1>
              <p className="mb-8 leading-relaxed">
                Nextron blog is your go-to source for the latest tech trends,
                insightful analyses and expert perspectives. Join us as we delve
                into the ever-evolving world of innovation and discovery.
              </p>
              <div className="flex justify-center gap-2">
                <Link href={"/"}>
                  <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                    Get Started
                  </span>
                </Link>
                <Link href={"/articles"}>
                  <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-gray-100 text-lg font-medium rounded-full text-black px-8 py-3 cursor-pointer">
                    Trending
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font px-5">
          <div className="container mx-auto flex lg:px-12 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full mb-10 md:mb-0">
              <Image
                className="object-cover object-center rounded"
                alt="hero"
                src="/image/hero.png"
                width={1064}
                height={832}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 flex flex-col md:items-start md:text-left items-center text-center mb-4">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Your Gateway to the Latest in Technology, Innovation, and Trends
              </h1>
              <p className="mb-8 leading-relaxed">
                Become a part of the Nextron community! <br /> Follow us,
                subscribe to our newsletter for updates and join the conversation in the
                comments section. <br /> We value your thoughts and insights and
                are excited to hear from you.
              </p>
              <div className="flex justify-center">
                <Link href={"/research"}>
                  <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                    Articles
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-center w-full lg:mb-5 mt-8">
            <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1">
              Most Viewed
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Featured Articles
            </h1>
          </div>
          <FeaturedPosts />
        </section>
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 px-5">
          <div className="lg:col-span-8 col-span-1 mt-4 rounded-lg">
            <div className="flex flex-col text-center w-full mb-5 mt-8">
              <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1">
                1 min Read
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Recommended Articles
              </h1>
            </div>
            {posts
              .slice(0, 10)
              .reverse()
              .map((post, index) => (
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

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};
