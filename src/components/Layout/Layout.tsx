import { Box } from "@chakra-ui/react";
import React from "react";
import UserDetailModal from "../Modals/UserDetailModal/UserDetailModal";
import Header from "./../Header/Header";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <UserDetailModal isOpen={true}></UserDetailModal>
      <Box paddingTop={"74px"}>
        <main className="">{children}</main>
      </Box>
    </>
  );
};

export default Layout;
