import React, { PropsWithChildren } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Head from "next/head";
import styles from "./Layout.module.scss";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>VPSA</title>
        <link rel="icon" href="sage.png" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
