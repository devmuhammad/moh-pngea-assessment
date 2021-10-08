import {
  Collapse,
  Text,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { navItem, navItems } from "utils/nav";

export const MobileNav = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack
      bg={useColorModeValue("#F5F5F4", "gray.800")}
      p={4}
      position="absolute"
      top="10"
      display={{ md: "none" }}
    >
      {navItems.map(({ label, link }: navItem) => (
        <Stack key={label} spacing={4} onClick={onToggle}>
          <Flex
            py={2}
            as={Link}
            href={link ?? "#"}
            justify={"space-between"}
            align={"center"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              {label}
            </Text>
          </Flex>

          <Collapse
            in={isOpen}
            animateOpacity
            style={{ marginTop: "0!important" }}
          >
            <Stack
              mt={2}
              pl={4}
              borderLeft={1}
              borderStyle={"solid"}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              align={"start"}
            ></Stack>
          </Collapse>
        </Stack>
      ))}
    </Stack>
  );
};
