import { gql } from "@apollo/client";
import { request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Posts List Query
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

// Post Details Query
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
      content {
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

// Category Query
export const getCategory = gql`
  query GetCategory {
    categories {
      name
      slug
    }
  }
`;

// Category Posts Query
export const getCategoryPost = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(where: { categories_some: { slug: $slug } }) {
      edges {
        cursor
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

// Categories List Query
export const getCategories = async () => {
  if (!graphqlAPI) {
    console.error("GraphQL API endpoint is not defined");
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

// Recent Posts Query
export const getRecentPosts = async () => {
  if (!graphqlAPI) {
    console.error("GraphQL API endpoint is not defined");
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

// Similar Post Query
export const getSimilarPosts = async (slug, categories) => {
  if (!graphqlAPI) {
    console.error("GraphQL API endpoint is not defined");
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

// Featured Posts Query
export const getFeaturedPosts = async () => {
  if (!graphqlAPI) {
    console.error("GraphQL API endpoint is not defined");
    return [];
  }

  const query = gql`
    query GetFeaturedPost {
      posts(where: { featuredPost: true }) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query);
    return result.posts;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};

// Comments Mutation
export const submitComment = async (obj) => {
  if (!graphqlAPI) {
    console.error("GraphQL API endpoint is not defined");
    return [];
  }
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

// Comments List Query
export const getComments = async (slug) => {
  if (!graphqlAPI) {
    console.error("GraphQL API endpoint is not defined");
    return [];
  }
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });

    return result.comments.length ? result.comments : null;
  } catch (error) {
    console.error("GraphQL query error:", error);
    return null;
  }
};
