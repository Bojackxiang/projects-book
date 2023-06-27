import { createUserMutation, getUserQuery } from "@/graphql-query";
import { GraphQLClient } from "graphql-request";


const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
    return null;
  } catch (err) {
    throw err;
  }
};

// export const fetchAllProjects = (
//   category?: string | null,
//   endcursor?: string | null
// ) => {
//   client.setHeader("x-api-key", apiKey);

//   return makeGraphQLRequest(projectsQuery, { category, endcursor });
// };

export const getUser = (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email });
  return null
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
  return null;
};
