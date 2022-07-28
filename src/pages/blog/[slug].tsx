import PortableText from "@src/components/PortableText";
import TableOfContent from "@src/components/TableOfContent";
import { sanityClient } from "@src/lib/sanityClient";
import { ICategory, IMeta, IPost, ITag } from "@src/models";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect } from "react";

type Props = {
  post: IPost;
  tags: ITag[];
  category: ICategory;
  meta: IMeta;
};

const BlogPage: NextPage<Props> = (props) => {
  const { category, meta, post, tags } = props;
  useEffect(() => {
    console.log(post.body);

    return () => {};
  }, [post.body]);

  return (
    <div className="container my-16 mx-auto px-4 xl:max-w-5xl">
      <div className="flex gap-8">
        <article className="my-16 flex-1 overflow-hidden">
          <div className="mb-16">
            <h1 className="text-4xl font-bold">{props.post.title}</h1>
          </div>
          <PortableText value={post.body} />
        </article>
        <aside className="relative hidden w-72 md:block">
          <div className="sticky top-0">
            <TableOfContent value={post.body} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && publishedAt < now()]{
      "slug": slug.current
    }`
  );

  return {
    paths: posts.map((item) => `/blog/${item.slug}`),
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

  const { post, tags, category, meta } = await sanityClient.fetch(
    /**groq */ `*[_type == "post" && slug.current == $slug][0]{
    "post":{
      "slug": slug.current,
      title,
      excerpt,
      body[]{
        ...,
        _type == "image" => {
          ...,
          "image": @.asset->
        }
      },
      publishedAt,
    },
    meta,
    tags[]-> {
      "slug": slug.current,
      title
    },
    category-> {
      "slug": slug.current,
      title
    }
  }`,
    { slug }
  );

  return {
    props: {
      post,
      tags,
      category,
      meta,
    },
  };
};
