import React, { PropsWithChildren } from "react";
import Navbar from "./NavBar";
import Head from "next/head";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>VPSA</title>
        <link rel="icon" href="sage.png" />
      </Head>
      <Navbar />
      {children}
    </>
  );
};
export default Layout;
