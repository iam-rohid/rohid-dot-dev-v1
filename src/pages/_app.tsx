import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "@src/components/Footer";
import NavBar from "@src/components/NavBar";
import { ColorSchemeProvider } from "@src/contexts/ColorScheme";
import "@src/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@src/lib/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rohid</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider>
          <NavBar />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
