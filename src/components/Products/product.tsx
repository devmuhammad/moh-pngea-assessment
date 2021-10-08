import { Button, Image, Text } from "@chakra-ui/react";
import { productDetails } from "./type";
import { cartItems, selectedCurrency } from "../../services/caches";
import { CartDrawer } from "components/Cart";
import { useState } from "react";

export const Product = (prod: productDetails) => {
  const [isDrawerOpen, setDrawer] = useState<boolean>(false);

  const addItemToCart = (prod: productDetails) => {
    let newProd = { ...prod };
    const itemIndex = cartItems().findIndex(
      (el: productDetails) => prod.id === el.id
    );

    if (itemIndex !== -1) {
      let nwCart = cartItems();
      nwCart[itemIndex].quantity += 1;
      nwCart[itemIndex].subTotal = prod.price * nwCart[itemIndex].quantity;
      cartItems(nwCart);
      return setDrawer(true);
    }
    newProd.quantity = 1;
    newProd.subTotal = prod.price;
    cartItems([...cartItems(), newProd]);
    setDrawer(true);
  };

  return (
    <>
      <CartDrawer closeDrawer={() => setDrawer(false)} isOpen={isDrawerOpen} />
      <Image
        src={prod.image_url}
        objectFit="contain"
        alt="Product Cover"
        width={{ base: "90%", md: "60%" }}
        height="250px"
        pb={{ base: 0, md: "20px" }}
      />
      <Text
        fontSize="18px"
        flexWrap="wrap"
        textAlign={{ base: "center", md: "left" }}
      >
        {" "}
        {prod.title}
      </Text>
      <Text fontSize="18px" py="10px" flexWrap="wrap" color="gray.600">
        From {selectedCurrency()} {prod.price}
      </Text>
      <Button
        bg="#4B5548"
        colorScheme="#4B5548"
        color="white"
        borderRadius="0"
        h="14"
        w={{ base: "100%", md: "60%" }}
        onClick={() => addItemToCart(prod)}
      >
        Add to Cart
      </Button>
    </>
  );
};
