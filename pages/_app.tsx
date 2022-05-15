import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { ColorSchemeProvider } from "../contexts/ColorScheme";
import "../styles/globals.css";

import "prismjs";
import BlogLayout from "../components/layouts/BlogLayout";
const getLoader = require("prismjs/dependencies");
const components = require("prismjs/components");

const componentsToLoad = ["markup", "css", "php", "tsx", "jsx", "ts", "js"];
const loadedComponents = ["clike", "javascript", "typescript"];

const loader = getLoader(components, componentsToLoad, loadedComponents);
loader.load((id: string) => {
  require(`prismjs/components/prism-${id}.min.js`);
});

function MyApp({ Component, pageProps, router }: AppProps) {
  console.log({ router });

  const isBlog = router.pathname.startsWith("/blog/");

  return (
    <>
      <Head>
        <title>Rohid</title>
      </Head>
      <ColorSchemeProvider>
        <Header />
        <main>
          {isBlog ? (
            <BlogLayout frontmatter={pageProps.markdoc.frontmatter}>
              <Component {...pageProps} />
            </BlogLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
        <Footer />
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
