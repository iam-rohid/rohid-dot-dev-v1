import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "@src/components/Footer/Footer";
import Header from "@src/components/Header/Header";
import { ColorSchemeProvider } from "@src/contexts/ColorScheme";
import "@src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rohid</title>
      </Head>
      <ColorSchemeProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
