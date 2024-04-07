"use client";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GET_CHARACTERS,
  CharactersResponse,
  CharactersVariables,
} from "./../../graphql/queries/GetCharacters";

import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import page from "../page";
import { Button, ButtonGroup } from "@chakra-ui/react";
import InformationDetailModal from "@/components/Modals/InformationDetailModal/InformationDetailModal";
import Layout from "@/components/Layout/Layout";

const InformationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error } = useQuery<
    CharactersResponse,
    CharactersVariables
  >(GET_CHARACTERS, {
    variables: { page },
    skip: !page, // Skip the query if page is not available yet
  });

  const updatePage = (newPage: number) => {
    if (newPage === 0) {
      return;
    }
    router.push(`/information?page=${newPage}`); // navigating to a new page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderInformationStacktUI = () => {
    return (
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        padding={"20px"}
        align="stretch"
      >
        <Container maxW="container.sm" color="#262626">
          <ul>
            {data?.characters.results.map((character) =>
              renderInformationStackElement(character)
            )}
          </ul>
        </Container>
      </VStack>
    );
  };
  const renderInformationStackElement = (character: any) => {
    return (
      <Card key={character.id} mb={2}>
        <CardBody
          sx={{ cursor: "pointer" }}
          onClick={() => openCharacterInformationDetails(character.id)}
        >
          <Flex align="center" gap="4">
            <Image
              boxSize="100px"
              objectFit="cover"
              src={character.image}
              alt={character.name}
            />
            <Text fontSize="2xl">{character.name}</Text>
          </Flex>
        </CardBody>
      </Card>
    );
  };

  const renderInformationStackControllerUI = () => {
    return (
      <Flex align="center" justify="center">
        <Stack spacing={4} direction="row" align="center">
          <ButtonGroup gap="4">
            <Button onClick={() => updatePage(page - 1)} disabled={page <= 1}>
              Previous
            </Button>
            <Button
              onClick={() => updatePage(page + 1)}
              disabled={!data?.characters.info.next}
            >
              Next
            </Button>
          </ButtonGroup>
        </Stack>
      </Flex>
    );
  };

  const openCharacterInformationDetails = (characterId: any) => {
    const ev = new CustomEvent("InformationDetailModal", {
      detail: {
        open: true,
        characterId,
      },
    });
    console.log("openCharacterInformationDetails", characterId);
    dispatchEvent(ev);
  };

  return (
    <Box paddingBottom={"16px"}>
      {renderInformationStacktUI()}
      {renderInformationStackControllerUI()}
      <InformationDetailModal isOpen={false}></InformationDetailModal>
    </Box>
  );
};

export default InformationPage;
