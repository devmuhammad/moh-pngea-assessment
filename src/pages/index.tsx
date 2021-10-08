import { Container } from "components/Container";
import Navbar from "components/Navbar";
import Products from "components/Products";
import { motion } from "framer-motion";
import React from "react";

const Index = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Navbar />
        <Products />
      </Container>
    </motion.div>
  );
};

export default Index;
