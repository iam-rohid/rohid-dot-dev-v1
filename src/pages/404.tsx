import Head from "next/head";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h1 className="mb-4 text-7xl font-bold">404</h1>
      <p className="mb-4 text-xl text-gray-600 dark:text-gray-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          Go to home page
        </a>
      </Link>
    </div>
  );
};

export default PageNotFound;
