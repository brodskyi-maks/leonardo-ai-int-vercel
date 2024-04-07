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
  Box,
  Flex,
  Heading,
  Tag,
  Image,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import {
  CharacterDetailsResponse,
  CharacterDetailsVariables,
  GET_CHARACTER_DETAILS,
} from "./../../../graphql/queries/GetCharacterDetail";
const initUserState = {
  userName: "",
  userJobTitle: "",
};

/* Rick and Morty Character Information Modal Preview */
const InformationDetailModal = ({ isOpen = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [characterId, setCharacterId] = useState("");

  const { data, loading, error, refetch } = useQuery<
    CharacterDetailsResponse,
    CharacterDetailsVariables
  >(GET_CHARACTER_DETAILS, {
    variables: { id: characterId },
    skip: !characterId, // Optionally skip the query if characterId isn't set
  });

  // Effect to refetch data whenever characterId changes
  useEffect(() => {
    if (characterId) {
      refetch({ id: characterId });
    }
  }, [characterId, refetch]);

  useEffect(() => {
    // Define a function that handles the event
    const informationModalHandler = (event: any) => {
      if (event?.detail) {
        const shouldOpen = event.detail.open;
        const characterIdToLoad = event.detail.characterId;
        setCharacterId(characterIdToLoad);
        setIsModalOpen(shouldOpen);
      }
    };

    // Added event listener to drive the visibility of this modal.
    window.addEventListener("InformationDetailModal", informationModalHandler);

    // Return a cleanup function that removes the event listener. Stops memory leaks
    return () => {
      window.removeEventListener(
        "InformationDetailModal",
        informationModalHandler
      );
    };
  }, []);

  const onCloseModalHandler = () => {
    setIsModalOpen(false);
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
        <ModalHeader>Character Document</ModalHeader>
        <ModalBody>
          {loading && <Box>Loading...</Box>}
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            gap="4"
          >
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={5}
              boxShadow="lg"
              bg="gray.50"
              width={{ base: "100%", md: "80%", lg: "60%" }}
            >
              <Image
                src={data?.character.image}
                alt={data?.character.name}
                borderRadius="full"
                boxSize="150px"
                mx="auto"
                my={5}
              />
              <Heading textAlign="center" mb={4} size="lg">
                {data?.character.name}
              </Heading>
              <Flex justify="center" gap={2} mb={4}>
                <Tag colorScheme="blue">{data?.character.species}</Tag>
                <Tag
                  colorScheme={
                    data?.character.status === "Alive" ? "green" : "red"
                  }
                >
                  {data?.character.status}
                </Tag>
                <Tag colorScheme="purple">{data?.character.gender}</Tag>
              </Flex>
              <Text fontSize="md" mb={2}>
                <strong>Location:</strong> {data?.character.location.name}
              </Text>
              <Text fontSize="md" mb={2}>
                <strong>Origin:</strong> {data?.character.origin.name}
              </Text>
              <Text fontSize="md" mb={2}>
                <strong>Type:</strong> {data?.character.type || "Unknown"}
              </Text>
              <Heading size="md" mt={5} mb={3}>
                Episodes
              </Heading>
              {data?.character.episode.map((ep) => (
                <Box key={ep.id} p={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    {ep.name}
                  </Text>
                  <Text fontSize="xs">
                    {ep.air_date} - {ep.episode}
                  </Text>
                </Box>
              ))}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onCloseModalHandler}>
            close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InformationDetailModal;
