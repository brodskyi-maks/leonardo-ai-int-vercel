"use client";
import React, { Suspense } from "react";

import { Box } from "@chakra-ui/react";
import InformationDetailModal from "@/components/Modals/InformationDetailModal/InformationDetailModal";
import CharactersList from "@/components/Information/CharacterList/CharacterList";

const InformationPage: React.FC = () => {
  return (
    <Box paddingBottom={"16px"}>
      <Suspense fallback={<div>Loading...</div>}>
        <CharactersList page={1} />
        <InformationDetailModal isOpen={false}></InformationDetailModal>
      </Suspense>
    </Box>
  );
};

export default InformationPage;
