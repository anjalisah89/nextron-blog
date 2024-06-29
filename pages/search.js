import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Search = ({ posts }) => {
  const router = useRouter();
  const { s } = router.query;

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Search Results For {'"'}
                {s}
                {'"'}
              </h1>
              <div className="h-1 w-20 bg-pink-500 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div className="xl:w-1/4 md:w-1/2 p-4" key={post.id}>
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
                    <p className="leading-relaxed text-base">{post.excerpt}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>
      </section>
    </div>
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

  const SEARCH_QUERY = gql`
    query SearchQuery($search: String) {
      posts(where: { _search: $search }) {
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
        }
      }
    }
  `;

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
