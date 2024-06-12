import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email, name, comment } = req.body;
  if (!email || !name || !comment) {
    return res.status(400).json({ message: "Name, email, and comment are required" });
  }

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation createContact($name: String!, $email: String!, $comment: String!) {
      createContact(data: { name: $name, email: $email, comment: $comment }) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, { name, email, comment });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error details:", error.response ? error.response.errors : error.message);
    return res.status(500).json({ success: false, message: "Error submitting contact details" });
  }
}
