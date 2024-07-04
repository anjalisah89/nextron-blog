import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import PostWidget from "@/components/PostWidget";
import TopButton from "@/components/TopButton";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { SEARCH_QUERY } from "@/services";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Search = ({ posts }) => {
  const router = useRouter();
  const { s } = router.query;

  return (
    <>
      <Head>
        <title>Search Posts</title>
        <meta
          name="description"
          content="Next Js Headless CMS GraphQL Blog App"
        />
        <link rel="icon" href="/image/logo.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 px-5">
        <div className="lg:col-span-8 col-span-1 mt-4 rounded-lg">
          <section className="text-gray-600 body-font mb-4">
            <div className="container lg:px-5 mx-auto">
              <div className="flex flex-wrap w-full lg:mb-10">
                <div className="w-full mb-6 lg:mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                    Search Results For {'"'}
                    {s}
                    {'"'}
                  </h1>
                  <div className="h-1 w-20 bg-pink-500 rounded"></div>
                </div>
              </div>
              <div className="flex flex-wrap -m-4">
                {s !== "" && posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div
                      className="xl:w-1/2 w-full p-4"
                      key={post.id || index}
                    >
                      <div className="bg-gray-100 p-6 rounded-lg">
                        <Link href={`/post/${post.slug}`}>
                          <Image
                            className="h-40 rounded w-full object-cover object-center mb-6"
                            src={post.featuredImage.url}
                            alt={post.title || "Image"}
                            width={720}
                            height={400}
                          />
                        </Link>
                        <h3 className="tracking-widest text-pink-500 text-xs font-medium title-font">
                          {post.categories.name}
                        </h3>
                        <Link href={`/post/${post.slug}`}>
                          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                            {post.title}
                          </h2>
                        </Link>
                        <p className="leading-relaxed text-base">
                          {post.excerpt.split(" ").slice(0, 10).join(" ") +
                            (post.excerpt.split(" ").length > 10 ? "..." : "")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="font-medium ml-5 mb-2 text-gray-900">
                    No posts found for {"'"}
                    {s}
                    {"'"}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
        <div className="lg:col-span-4 col-span-1 lg:mb-4 mb-16">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      <TopButton />
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
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

  const searchQuery = context.query.s || "";

  try {
    const { data } = await client.query({
      query: SEARCH_QUERY,
      variables: { search: searchQuery },
    });

    return {
      props: {
        posts: data.posts ?? [],
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error.message);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default Search;
