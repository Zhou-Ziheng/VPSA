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

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Layout>
          <div
            style={{
              backgroundColor: styles.black,
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Component {...pageProps} />
          </div>
        </Layout>
      </main>
    </ThemeProvider>
  );
}
