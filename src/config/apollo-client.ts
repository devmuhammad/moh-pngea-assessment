import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { persistCache } from "apollo3-cache-persist";

const cache = new InMemoryCache();

// await persistCache({
//   cache,
//   storage: localStorage,
// });
const client = new ApolloClient({
  cache,
  uri: "https://pangaea-interviews.now.sh/api/graphql", //USE ENV if avail
});

export default client;
