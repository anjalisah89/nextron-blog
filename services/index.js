import { gql } from "@apollo/client";
import { request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = gql`
  query GetPosts {
    postsConnection {
      edges {
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`;

export const getPostDetails = gql`
  query GetPostDetails($slug: String!) {
    post(where: { slug: $slug }) {
      author {
        bio
        name
        id
        photo {
          url
        }
      }
      createdAt
      slug
      title
      excerpt
      content{
        raw
      }
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
    }
  }
`;

export const getRecentPosts = async () => {
  if (!graphqlAPI) {
    console.error('GraphQL API endpoint is not defined');
    return [];
  }
  const query = gql`
    query GetRecentPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimilarPosts = async (slug, categories) => {
  if (!graphqlAPI) {
    console.error('GraphQL API endpoint is not defined');
    return [];
  }
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const variables = { slug, categories };
  const result = await request(graphqlAPI, query, variables);
  return result.posts;
};

export const getCategories = async () => {
  if (!graphqlAPI) {
    console.error('GraphQL API endpoint is not defined');
    return [];
  }
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};
