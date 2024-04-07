"use client";
import { Box, Flex, IconButton, Menu, MenuButton } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Header = () => {
  /* Header element which is shared between pages */
  // we can use breakpoints, like so
  // const isMobile = useBreakpointValue({ base: true, md: false });
  // but decided to against to minimize rerenders and hook call
  const openUserModalHandler = (newStateIn: any) => {
    const ev = new CustomEvent("UserDetailModal", { detail: true });
    dispatchEvent(ev);
  };

  return (
    <Flex
      top={0}
      position="fixed"
      justify="right"
      wrap="wrap"
      width="100%"
      p={4}
      minHeight="74px"
      border="1px solid #4a556830"
      bg="white"
      zIndex="banner"
    >
      <Box display={{ base: "flex", md: "flex" }}>
        <Menu>
          {() => (
            <>
              <MenuButton
                as={IconButton}
                icon={<ExternalLinkIcon />}
                onClick={openUserModalHandler}
                variant="outline"
                aria-label="Options"
              />
            </>
          )}
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
