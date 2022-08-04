import PageHeader from "@src/components/PageHeader";
import SnippetCard from "@src/components/SnippetCard";
import { sanityClient } from "@src/lib/sanityClient";
import { ISnippet } from "@src/models/snippet";
import { GetStaticProps } from "next";
import React from "react";

type Props = {
  snippets: ISnippet[];
};
const SnippetsPage = (props: Props) => {
  const { snippets } = props;

  return (
    <div className="container mx-auto my-16 px-4 xl:max-w-4xl">
      <PageHeader title="Sinppets" />
      <div className="space-y-8">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.slug} snippet={snippet} />
        ))}
      </div>
    </div>
  );
};

export default SnippetsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const snippets =
    await sanityClient.fetch(/* groq */ `*[_type == "snippet" && publishedAt < now()] | order(publishedAt desc, title asc){
    title,
    "slug": slug.current,
    description,
    files
  }`);
  return {
    props: {
      snippets,
    },
    revalidate: 60,
  };
};
