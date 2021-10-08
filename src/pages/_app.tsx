import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import "@fontsource/karla";
import "@fontsource/libre-caslon-display";

import { ApolloProvider } from "@apollo/client";
import { api } from "../config";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={api}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
