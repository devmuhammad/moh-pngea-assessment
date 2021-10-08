import {
  Box,
  Image,
  Flex,
  Text,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { productDetails } from "components/Products/type";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { cartItems, selectedCurrency } from "services/caches";

export const CartItem = (prod: productDetails) => {
  const [quantity, setQuantity] = useState(prod.quantity);
  const [price, setPrice] = useState(prod.price * prod.quantity!);
  useEffect(() => {
    setPrice(prod.price * prod.quantity!);
    setQuantity(prod.quantity);
  }, [prod]);

  const removeItem = () => {
    const remItems = cartItems().filter(
      (el: productDetails) => prod.id !== el.id
    );

    cartItems(remItems);
  };

  const incrementItems = () => {
    let nwCart = cartItems().map((el: any) => {
      if (prod.id !== el.id) return el;
      el.quantity += 1;
      el.subTotal = prod.price * el.quantity;

      setPrice(el.subTotal);
      setQuantity(el.quantity);
      return el;
    });
    return cartItems(nwCart);
  };

  const decrementItems = () => {
    if (quantity === 1) {
      return removeItem();
    }
    let nwCart = cartItems().map((el: any) => {
      if (prod.id !== el.id) return el;
      el.quantity -= 1;
      el.subTotal = prod.price * el.quantity;
      setPrice(el.subTotal);
      setQuantity(el.quantity);
      return el;
    });
    return cartItems(nwCart);
  };

  return (
    <Box w="100%" p="4" pt="2" minH="100px" bg="white" mb="4">
      <Flex justifyContent="end">
        <Box onClick={removeItem} cursor="pointer">
          <IoCloseOutline fontSize="18" />
        </Box>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} placeItems="center">
        <GridItem colSpan={2}>
          <Text fontSize="sm">{prod.title}</Text>
          <Text fontSize="xs" pb="2">
            One time purchase of Two Month supply.
          </Text>
          <Flex
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <InputGroup w={{ base: "55%", md: "35%" }}>
              <InputLeftElement
                cursor="pointer"
                children="-"
                onClick={decrementItems}
              />
              <Input value={quantity} size={"md"} disabled />
              <InputRightElement
                children="+"
                cursor="pointer"
                onClick={incrementItems}
              />
            </InputGroup>

            <Text>
              {" "}
              {selectedCurrency()} {price.toLocaleString()}
            </Text>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          w="50%"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={prod.image_url}></Image>
        </GridItem>
      </Grid>
    </Box>
  );
};
