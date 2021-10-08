/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Box,
  Text,
  Select,
  Heading,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { defaults } from "services";
import { Product } from "./product";
import { allProducts, selectedCurrency } from "services/caches";
import { productDetails } from "./type";
import { useReactiveVar } from "@apollo/client";

const Products = () => {
  const filters = [
    "All Products",
    "New Products",
    "Sets",
    "Skincare",
    "Hair & Body Care",
    "Accessories",
  ];
  // const [products, setProducts] = useState([]);
  const products = useReactiveVar(allProducts);

  useEffect(() => {
    setDetails();
  }, [selectedCurrency()]);

  const setDetails = async () => {
    await defaults.getAllProducts(selectedCurrency());
  };

  return (
    <>
      <Flex
        bg="#F5F5F4"
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        minH="40"
        p={{ base: "12", md: "24" }}
      >
        <Box>
          <Heading
            fontFamily="Libre Caslon Display"
            fontSize="46px"
            fontWeight="100"
            pt={12}
          >
            {" "}
            All Products
          </Heading>
          <Text
            fontSize="18px"
            fontWeight="100"
            py={{ base: "4", md: 2 }}
            textAlign={{ base: "center", md: "left" }}
          >
            A 360° look at Lumin
          </Text>
        </Box>
        <Select
          variant="outline"
          cursor="pointer"
          borderRadius="0"
          mt={{ base: 0, md: 12 }}
          w={{ base: "100%", md: "30%" }}
          size="lg"
          bg="white"
          placeholder="Filter by"
        >
          {filters.map((filter: string, id: number) => (
            <option key={id} value={filter}>
              {" "}
              {filter}
            </option>
          ))}
        </Select>
      </Flex>
      <Box
        d="block"
        bg="#e2e6e3"
        px={{ base: "20px", md: "100px" }}
        py={{ base: "20px", md: "50px" }}
      >
        {products.length === 0 ? (
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            minH="50vh"
          >
            <Spinner size="xl" color="#4B5548" />
          </Flex>
        ) : (
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
            gap={{ base: 4, md: 8 }}
            rowGap={{ base: 4, md: 20 }}
          >
            {products.map((product: productDetails) => {
              return (
                <GridItem
                  key={product.id}
                  d="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Product {...product} />
                </GridItem>
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Products;
