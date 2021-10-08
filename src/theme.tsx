import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  heading: "Libre Caslon Display",
  body: "Karla",
};

const breakpoints = createBreakpoints({
  // sm: '40em',
  // md: '52em',
  // lg: '64em',
  // xl: '80em',
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});
const colors = {
  black: "#16161D",
  brand_gray: "#E9ECF1",
};

const theme: any = extendTheme(
  withDefaultColorScheme({ colorScheme: "brand_gray" }),
  {
    colors,
    fonts,
    breakpoints,
  }
);

export default theme;
