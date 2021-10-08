import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query Products($priceCurrency: Currency) {
    products {
      id
      image_url
      title
      price(currency: $priceCurrency)
    }
  }
`;

export const GET_CURRENCIES = gql`
  query Currencies {
    currency
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    allCartItems @client
  }
`;
