"use client";
import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const navigateToInfoPage = () => {
    router.push(`/information?page=${1}`);
  };

  return (
    <Box position="relative" h="auto">
      <Box
        width="100vw"
        height={{ base: "100vh", md: "100vh" }} // Adjusts height based on the breakpoint
        backgroundImage={{
          base: "url('https://i.redd.it/skodeu3osgvx.jpg')",
          md: "url('https://i.redd.it/skodeu3osgvx.jpg')",
        }} // Responsive backgroundImage
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <AbsoluteCenter
          bg="tomato"
          p="4"
          color="white"
          axis="both"
          onClick={navigateToInfoPage}
          sx={{ cursor: "pointer" }}
        >
          Explore Rick And Morty Characters
        </AbsoluteCenter>
      </Box>
    </Box>
  );
}
