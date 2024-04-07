import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
/* urls should be moved to .env so deployment can be done to multiple environments */
const httpLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
