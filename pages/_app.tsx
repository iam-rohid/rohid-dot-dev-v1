import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header/Header";
import { ColorSchemeProvider } from "../contexts/ColorScheme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rohid</title>
      </Head>
      <ColorSchemeProvider>
        <Header />
        <Component {...pageProps} />
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
