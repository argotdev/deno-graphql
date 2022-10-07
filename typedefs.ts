import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

export const typeDefs = gql`
  type Query {
    hello: String
    allDinosaurs: [Dinosaur!]!
    oneDinosaur(name: String!): [Dinosaur!]!
  }

  type Dinosaur {
    name: String!
    description: String!
  }

  type Mutation {
    addDinosaur(name: String!, description: String!): Dinosaur!
  }
`;
