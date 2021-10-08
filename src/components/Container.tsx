import { Box, useColorMode, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "transparent", dark: "brand_purple.800" };

  const color = { light: "black", dark: "white" };
  return (
    <Box
      height="100%"
      width="100%"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
