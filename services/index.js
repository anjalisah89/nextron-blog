import { gql } from '@apollo/client';
import { request } from 'graphql-request';

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

export const getRecentPosts = async() =>{
 const query = gql`
 query GetRecentPosts(){
   posts(
     orderBy: createdAt_ASC
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
 const result = await request (graphqlAPI,query);
 return result.posts;
} 

export const getSimilarPosts = async() =>{
  const query = gql`
  query getSimilarPosts($slug: String!, $categories: [String!]){
    posts(
     Where: { slug_not: $slug, AND: {Categories_some: { slug_in: $categories}}}
     lasts: 3
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
  const result = await request (graphqlAPI,query);
  return result.posts;
 } 