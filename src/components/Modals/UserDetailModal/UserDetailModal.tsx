"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Box,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import IUser from "@/components/User/IUser";
import storageHelper from "@/helpers/storageHelper";

const initUserState = {
  userName: "",
  userJobTitle: "",
};
/* Username and Job Title Modal with Preview */
/* Degault behavior is set to appear on reload (Layout component), in prod 
should make this property driven by user settings shared accross devices 
and check for session so  unauthorized boot to login screen */
const UserDetailModal = ({ isOpen = false }) => {
  const loadedUser = storageHelper.loadUserFromLocalStorage() || initUserState;
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [userFormData, setUserFormData] = useState<IUser>(loadedUser);
  const userFormDataRef = useRef<IUser>(userFormData);
  useEffect(() => {
    const changeDefaultModalVisibilityStateHandler = (event: any) => {
      if (event?.detail) {
        setIsModalOpen(event.detail);
      }
    };

    /* Driving visibility of modal via custom events. */
    // Add event listener
    window.addEventListener(
      "UserDetailModal",
      changeDefaultModalVisibilityStateHandler
    );

    // Return a cleanup function that removes the event listener. Stops memory leaks
    return () => {
      window.removeEventListener(
        "UserDetailModal",
        changeDefaultModalVisibilityStateHandler
      );
    };
  }, []);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    userFormDataRef.current[name] = value;
    setUserFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onCloseModalBtnHandler = () => {
    storageHelper.saveUserToLocalStorage(userFormDataRef.current);
    onCloseModalHandler();
  };

  const onCloseModalHandler = () => {
    setIsModalOpen(false);
  };

  const renderPreviewUi = () => {
    return (
      <VStack spacing={0} align="stretch" flex="1">
        <Text fontSize="md" as="ins">
          Preview
        </Text>

        <Text fontSize="md" marginRight="2">
          User name:
          {userFormData?.userName}
        </Text>

        <Text fontSize="md">
          Job title:
          {userFormData?.userJobTitle}
        </Text>
      </VStack>
    );
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onCloseModalHandler}
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent maxW="4xl">
        <ModalHeader>User Details</ModalHeader>
        <ModalBody>
          <Flex direction={{ base: "column", md: "row" }} gap="4">
            {/* Left Section */}
            <VStack spacing={4} align="stretch" flex="1" pr={{ md: 2 }}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>User name</FormLabel>
                  <Input
                    type="text"
                    name="userName"
                    value={userFormData?.userName ?? ""}
                    onChange={handleInputChange}
                    placeholder="User Name"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormLabel>Job title</FormLabel>
                <Input
                  placeholder="Job title"
                  name="userJobTitle"
                  value={userFormData?.userJobTitle ?? ""}
                  onChange={handleInputChange}
                />
              </Box>
            </VStack>

            {/* Right Section */}
            {renderPreviewUi()}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onCloseModalBtnHandler}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailModal;
