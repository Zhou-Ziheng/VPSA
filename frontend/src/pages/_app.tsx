import { useState } from "react";
import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import styles from "@/styles/variables.module.scss";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Roboto } from "next/font/google";
import { GraphQLClient } from "graphql-request";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const client = new GraphQLClient("http://localhost:4000/graphql", {
  credentials: "include",
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: styles.lightgreen },
    secondary: { main: styles.darkgray },
  },
  typography: {
    fontFamily: ["roboto"].join(","),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <main
        className={roboto.className}
        style={{
          backgroundColor: styles.black,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Layout>
          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              flexBasis: 0,
              alignItems: "center",
            }}
          >
            <Component {...pageProps} />
          </div>
        </Layout>
      </main>
    </ThemeProvider>
  );
}
