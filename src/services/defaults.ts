import { allProducts } from "./caches/index";
import { createStandaloneToast } from "@chakra-ui/react";
import client from "config/apollo-client";

import { GET_ALL_PRODUCTS } from "./queries";

const toast = createStandaloneToast();

export const getAllProducts = async (currency: string) => {
  try {
    const resp = await client.query({
      query: GET_ALL_PRODUCTS,
      variables: { priceCurrency: currency },
    });

    const { loading, error, data } = resp;
    if (loading) return "Loading...";
    if (error)
      return toast({
        title: "An error occurred",
        position: "top",
        description: "Unable to fetch products",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    if (!data)
      return toast({
        title: "No Product",
        position: "top",
        description: "Empty Product List",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    allProducts(data.products);
    return data.products;
  } catch (error) {
    return toast({
      title: "Server Error",
      position: "top",
      description: "Unable to fetch products",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
