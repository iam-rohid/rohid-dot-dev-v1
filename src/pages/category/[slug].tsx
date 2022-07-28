import PageHeader from "@src/components/PageHeader";
import PostsList from "@src/components/PostsList";
import ProjectsGrid from "@src/components/ProjectsGrid";
import { sanityClient } from "@src/lib/sanityClient";
import { ICategory, IPost, IProject, ITag } from "@src/models";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect } from "react";

type Props = {
  category: ICategory;
  posts: (IPost & { tags: ITag[] })[];
  projects: (IProject & { tags: ITag[] })[];
};

const CategoryPage: NextPage<Props> = (props: Props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const { category, posts, projects } = props;
  return (
    <div className="container mx-auto mb-2 px-4 xl:max-w-5xl">
      <PageHeader title={category.title} description={category.description} />
      <ProjectsGrid
        title={`Projects - ${projects?.length || 0}`}
        data={projects}
      />
      <PostsList title={`Posts - ${posts.length || 0}`} data={posts} />
    </div>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await sanityClient.fetch(
    `*[_type == "category"]{
      "slug": slug.current
    }`
  );

  return {
    paths: categories.map((item) => `/category/${item.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const slug = context.params["slug"];

  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const { category, posts, projects } = await sanityClient.fetch(
    /* groq */ `*[_type == "category" && slug.current == $slug][0]{
    "category": {
      "slug": slug.current,
      title,
      description,
    },
    "posts": *[_type == "post" && category._ref == ^._id && publishedAt < now()]{
      "slug": slug.current,
      title,
      excerpt,
      publishedAt,
      tags[]->{
        "slug": slug.current,
        title,
      }
    },
    "projects": *[_type == "project" && category._ref == ^._id && publishedAt < now()]{
      "slug": slug.current,
      title,
      images,
      tags[]->{
        "slug": slug.current,
        title,
      }
    }
  }`,
    {
      slug,
    }
  );
  return {
    props: {
      category,
      posts,
      projects,
    },
  };
};
