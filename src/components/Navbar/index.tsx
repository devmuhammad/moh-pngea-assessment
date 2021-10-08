/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  Stack,
  Collapse,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { MobileNav } from "./mobile-nav";
import { navItem, navItems } from "utils/nav";
import { useReactiveVar } from "@apollo/client";

import { BsCart3 } from "react-icons/bs";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { CartDrawer } from "components/Cart";
import { cartItems } from "services/caches";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  //   const [cartItem] = useState<number>(0);
  const [isDrawerOpen, setDrawer] = useState<boolean>(false);
  const cartItemCount = useReactiveVar(cartItems).length;

  const openDrawer = () => {
    setDrawer(true);
  };

  return (
    <Box>
      <CartDrawer closeDrawer={() => setDrawer(false)} isOpen={isDrawerOpen} />
      <Flex
        position="fixed"
        w="100%"
        zIndex="overlay"
        bg={useColorModeValue("#F5F5F4", "gray.800")}
        color={useColorModeValue("black", "white")}
        minH={"40px"}
        py={{ base: 2 }}
        px={{ base: 4, lg: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={6} h={6} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link
            textAlign={{ base: "center", md: "left" }}
            fontWeight="100"
            fontSize={{ base: "28", md: "36" }}
            style={{ letterSpacing: "18px", textDecoration: "none" }}
            href={"/"}
          >
            LUMIN
          </Link>

          <Flex
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            ml={10}
          >
            <Stack direction={"row"} spacing={4}>
              {navItems.map((navItem: navItem) => (
                <Box key={navItem.label}>
                  <Link
                    p={2}
                    href={navItem.link ?? "#"}
                    fontSize={"md"}
                    fontWeight={300}
                    color={"gray.600"}
                    _hover={{
                      textDecoration: "none",
                      color: "gray.800",
                    }}
                  >
                    {navItem.label}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          alignItems="center"
          direction={"row"}
          spacing={8}
        >
          <Link
            fontSize={"md"}
            fontWeight={300}
            display={{ base: "none", md: "flex" }}
            href={"#"}
            color={"gray.600"}
            _hover={{
              textDecoration: "none",
              color: "gray.800",
            }}
          >
            Account
          </Link>

          <Flex
            cursor="pointer"
            fontSize={"md"}
            alignItems="center"
            fontWeight={300}
            flexDir="row"
            onClick={openDrawer}
          >
            <BsCart3 fontSize="20" />
            <Text pb="4" fontSize="sm">
              {cartItemCount}
            </Text>
          </Flex>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
