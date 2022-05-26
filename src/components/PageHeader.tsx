import Head from "next/head";
import React, { ReactNode } from "react";

type PageHeader = {
  title: string;
  description?: string;
  children: ReactNode;
};
const PageHeader = ({ title, description, children }: PageHeader) => {
  return (
    <section className="my-16">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="mb-6 gap-4">
        <h1 className="text-4xl font-black">{title}</h1>
        {description && <p className="mt-2">{description}</p>}
      </div>
      {children}
    </section>
  );
};

export default PageHeader;
