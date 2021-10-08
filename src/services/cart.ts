import { createStandaloneToast } from "@chakra-ui/react";
import client from "config/apollo-client";

import { GET_CART_ITEMS, GET_CURRENCIES } from "./queries";

const toast = createStandaloneToast();

export const GetCartItems = async () => {
  const resp = await client.query({
    query: GET_CART_ITEMS,
  });

  const { loading, error, data } = resp;
  if (loading) return "Loading...";
  if (error)
    return toast({
      title: "An error occurred",
      position: "top",
      description: "Unable to fetch cart items",
      status: "error",
      duration: 4000,
      isClosable: true,
    });

  return data.allCartItems;
};

export const getCurrencies = async () => {
  const resp = await client.query({
    query: GET_CURRENCIES,
  });
  const { loading, error, data } = resp;
  if (loading) return "Loading ...";
  if (error)
    return toast({
      title: "An error occurred",
      position: "top",
      description: "Unable to fetch cart items",
      status: "error",
      duration: 4000,
      isClosable: true,
    });

  return data.currency;
};
