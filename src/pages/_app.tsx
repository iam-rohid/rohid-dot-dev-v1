import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "@src/components/Footer";
import NavBar from "@src/components/NavBar";
import { ColorSchemeProvider } from "@src/contexts/ColorScheme";
import "@src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rohid</title>
      </Head>
      <ColorSchemeProvider>
        <NavBar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
