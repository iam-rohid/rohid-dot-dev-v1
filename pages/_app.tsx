import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/Footer/Footer";
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
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
