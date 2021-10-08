import { makeVar, InMemoryCache } from "@apollo/client";

export const cartItems = makeVar<any>([]);

export const selectedCurrency = makeVar("NGN");
export const openCart = makeVar(false);

export const allProducts = makeVar<any>([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        selCurrency: {
          read() {
            return selectedCurrency();
          },
        },
        allCartItems: {
          read() {
            return cartItems();
          },
        },
      },
    },
  },
});
