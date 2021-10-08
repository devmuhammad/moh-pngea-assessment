import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const Loader = () => {
  const { onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Spinner size="xl" color="black" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
