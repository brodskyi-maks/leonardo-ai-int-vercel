"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_CHARACTERS,
  CharactersResponse,
  CharactersVariables,
} from "../../../graphql/queries/GetCharacters";
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Stack,
  StackDivider,
  VStack,
  Image,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";

interface CharactersListProps {
  page: number;
}

const CharactersList: React.FC<CharactersListProps> = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();

  const updatePage = (newPage: number) => {
    if (newPage === 0) return;
    router.push(`/information?page=${newPage}`); // Corrected to use push for navigation
  };

  const { data, error, loading } = useQuery<
    CharactersResponse,
    CharactersVariables
  >(GET_CHARACTERS, {
    variables: { page },
    skip: !page,
  });

  if (error) return <p>Error: {error.message}</p>;

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
          onClick={() => openCharacterInformationDetails(character.id)}
          sx={{ cursor: "pointer" }}
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

  return (
    <Box>
      {renderInformationStacktUI()}
      {renderInformationStackControllerUI()}
    </Box>
  );
};

export default CharactersList;
