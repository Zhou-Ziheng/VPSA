import { useState } from "react";
import Layout from "@/components/Layout";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Roboto } from "next/font/google";
import { GraphQLClient } from "graphql-request";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { serverUrl } from "@/constants";
import "@/styles/globals.scss";
import styles from "@/styles/variables.module.scss";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const client = new GraphQLClient(`${serverUrl}/graphql`, {
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
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ThemeProvider>
  );
}
