import Code from "@src/components/atoms/Code";
import PortableText from "@src/components/PortableText";
import { sanityClient } from "@src/lib/sanityClient";
import { ISnippet } from "@src/models/snippet";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

type Props = {
  snippet: ISnippet;
};

const SnippetPage = (props: Props) => {
  const { snippet } = props;
  return (
    <div className="container my-16 mx-auto px-4 xl:max-w-5xl">
      <div className="flex gap-8">
        <article className="flex-1 overflow-hidden">
          <div className="mb-16">
            <h1 className="mb-4 text-4xl font-bold">{snippet.title}</h1>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
              {snippet.description}
            </p>
          </div>
          <div className="space-y-8">
            {snippet.files.map((file) => (
              <div key={file._key} className="flex flex-col items-start">
                <p className="-mb-6 rounded-xl bg-gray-100 px-6 pb-8 pt-3 dark:bg-gray-800">
                  {file.fileName}
                </p>
                <div className="prose prose-lg w-full max-w-full overflow-hidden dark:prose-invert">
                  <Code
                    value={{
                      code: file.code.code,
                      language: file.code.language,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default SnippetPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const snippets = await sanityClient.fetch(
    `*[_type == "snippet" && publishedAt < now()]{
      "slug": slug.current
    }`
  );

  return {
    paths: snippets.map((item) => `/snippets/${item.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  if (!context.params)
    return {
      notFound: true,
    };

  const slug = context.params["slug"];

  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const snippet = await sanityClient.fetch(
    /* groq */ `*[_type == "snippet" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description,
    files
  }`,
    { slug }
  );

  return {
    props: {
      snippet,
    },
  };
};
