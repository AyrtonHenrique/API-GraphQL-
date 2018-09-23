import { makeExecutableSchema } from "graphql-tools"
import { graphql } from "graphql";

const users: any[] =[
  {
    id:1,
    name: "ayrton",
    email: "ayrton@live.com"
  }
];

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }
`;

const resolvers ={
  Query: {
    allUsers:() => users
  }
}

export default makeExecutableSchema({ typeDefs, resolvers});