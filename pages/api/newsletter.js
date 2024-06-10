import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateNewsletter($email: String!) {
      createNewsletter(data: { email: $email }) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, { email });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error submitting newsletter:', error);
    return res.status(500).json({ success: false, message: 'Error submitting newsletter' });
  }
}
