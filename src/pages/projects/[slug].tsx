import PortableText from "@src/components/PortableText";
import TableOfContent from "@src/components/TableOfContent";
import imageUrl from "@src/lib/imageUrl";
import { sanityClient } from "@src/lib/sanityClient";
import { ICategory, IMeta, IPost, IProject, ITag } from "@src/models";
import classNames from "classnames";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

type Props = {
  project: IProject;
  tags: ITag[];
  category: ICategory;
  meta: IMeta;
};

const ProjectPage: NextPage<Props> = (props) => {
  const { category, meta, project, tags } = props;
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="container my-16 mx-auto px-4 xl:max-w-5xl">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
        <Image
          src={imageUrl(project.images[imageIndex]).url()}
          alt="image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 md:grid-cols-6">
        {project.images.map((item, index) => (
          <button
            key={item._key}
            onClick={() => setImageIndex(index)}
            className={classNames(
              "relative aspect-[3/2] overflow-hidden rounded-md ring-blue-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-900",
              {
                "ring-2": imageIndex === index,
              }
            )}
          >
            <Image
              src={imageUrl(project.images[index]).width(300).height(200).url()}
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          </button>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-2">
        {!!project.repositoryUrl && (
          <a
            href={project.repositoryUrl}
            className="flex h-10 items-center justify-center gap-2 rounded-full pl-2 pr-4 hover:bg-gray-100 dark:hover:bg-gray-800"
            target={`_blank`}
          >
            <FaGithub className="text-2xl" />
            <span>Repo</span>
          </a>
        )}
        {!!project.visitUrl && (
          <a
            href={project.visitUrl}
            className="flex h-10 items-center justify-center gap-2 rounded-full pl-2 pr-4 hover:bg-gray-100 dark:hover:bg-gray-800"
            target={`_blank`}
          >
            <MdOpenInNew className="text-2xl" />
            <span>Visit</span>
          </a>
        )}
      </div>
      <div className="flex gap-8">
        <article className="my-16 flex-1 overflow-hidden">
          <div className="mb-16">
            <h1 className="text-4xl font-bold">{props.project.title}</h1>
          </div>
          <PortableText value={project.body} />
        </article>
        <aside className="relative hidden w-72 lg:block">
          <div className="sticky top-0">
            <TableOfContent value={project.body} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await sanityClient.fetch(
    `*[_type == "project" && publishedAt < now()]{
      "slug": slug.current
    }`
  );

  return {
    paths: projects.map((item) => `/projects/${item.slug}`),
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

  const { project, tags, category, meta } = await sanityClient.fetch(
    /**groq */ `*[_type == "project" && slug.current == $slug][0]{
    "project":{
      "slug": slug.current,
      title,
      body[]{
        ...,
        _type == "image" => {
          ...,
          "image": @.asset->
        }
      },
      publishedAt,
      repositoryUrl,
      visitUrl,
      images
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
      project,
      tags,
      category,
      meta,
    },
  };
};
