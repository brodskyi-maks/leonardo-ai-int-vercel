import { gql } from "@apollo/client";
/* Decided to keep interfaces within query because of rediability */
export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      episode {
        id
        name
        air_date
        episode
      }
      location {
        name
      }
      origin {
        name
      }
    }
  }
`;

// Updated Character interface to include all fields from GET_CHARACTER_DETAILS
export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: Episode[];
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
}

// Interface for Episode data
export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

// Interface for the response of GET_CHARACTER_DETAILS
export interface CharacterDetailsResponse {
  character: Character;
}

// Interface for the variables required by GET_CHARACTER_DETAILS
export interface CharacterDetailsVariables {
  id: string;
}
