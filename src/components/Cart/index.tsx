import {
  Button,
  Drawer,
  DrawerBody,
  Flex,
  DrawerContent,
  DrawerFooter,
  Text,
  DrawerOverlay,
  Select,
  Box,
} from "@chakra-ui/react";
import { BiChevronRightCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { cart, defaults } from "services";
import { useReactiveVar } from "@apollo/client";
import { allProducts, cartItems, selectedCurrency } from "services/caches";
import { productDetails } from "components/Products/type";
import { CartItem } from "./cart-item";

interface CartProps {
  isOpen: boolean;
  closeDrawer?: () => void;
}

export const CartDrawer = (props: CartProps) => {
  const { isOpen, closeDrawer } = props;
  const allCartItems = useReactiveVar(cartItems);
  const [currencies, setCurrencies] = useState([]);
  //   const [selCurr, setCurr] = useState("");

  useEffect(() => {
    setDetails();
  }, []);

  const setDetails = async () => {
    const currencies = await cart.getCurrencies();
    setCurrencies(currencies);
  };

  const itemsTotal = () => {
    return cartItems().reduce((a: number, b: any) => a + b.subTotal, 0);
  };

  const changeCurrency = async (e: any) => {
    // setCurr(e.target.value || "NGN");
    selectedCurrency(e.target.value || "NGN");
    await defaults.getAllProducts(selectedCurrency());
    const cartWithNewPrices = cartItems().map((el: any) => {
      el.price = allProducts().find((x: any) => el.id === x.id).price;
      el.subTotal = el.price * el.quantity;
      return el;
    });
    cartItems(cartWithNewPrices);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={closeDrawer!}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bg="#F2F2EE">
          <Flex alignItems="center" px="4" py="4">
            <BiChevronRightCircle
              fontSize="24"
              color="gray"
              cursor="pointer"
              onClick={closeDrawer}
            />
            <Text textAlign="center" w="full" color="gray" fontSize="xs">
              YOUR CART
            </Text>
          </Flex>
          <DrawerBody>
            <Select
              variant="filled"
              cursor="pointer"
              borderRadius="0"
              my="2"
              w={{ base: "30%", md: "20%" }}
              size="sm"
              bg="white"
              value={selectedCurrency()}
              onChange={changeCurrency}
            >
              {currencies.map((currency: string, id: number) => (
                <option key={id} value={currency}>
                  {" "}
                  {currency}
                </option>
              ))}
            </Select>
            <Box overflowY="auto">
              {allCartItems.length === 0 ? (
                <Text fontSize="md" textAlign="center">
                  {" "}
                  There are no items in your cart
                </Text>
              ) : (
                allCartItems.map((cartItem: productDetails) => (
                  <CartItem key={cartItem.id} {...cartItem} />
                ))
              )}
            </Box>
          </DrawerBody>
          {allCartItems.length !== 0 && (
            <DrawerFooter d="block" borderTopWidth="1px" borderColor="gray.300">
              <Flex
                justifyContent="space-between"
                fontSize="sm"
                pb="4"
                color="#4B5548"
              >
                <Text> Subtotal </Text>
                <Text>
                  {selectedCurrency()} {itemsTotal().toLocaleString()}
                </Text>
              </Flex>
              <Button
                variant="outline"
                borderRadius="0"
                w="100%"
                borderColor="#4B5548"
                color="#4B5548"
                bg="white"
                fontSize="sm"
                h="12"
                fontWeight="300"
                my="4"
              >
                MAKE THIS A SUBSCRIPTION ( SAVE 20% )
              </Button>
              <Button
                variant="outline"
                borderRadius="0"
                w="100%"
                bg="#4B5548"
                fontSize="sm"
                color="white"
                h="12"
                fontWeight="200"
              >
                PROCEED TO CHECKOUT
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
