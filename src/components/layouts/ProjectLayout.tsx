import { Project } from "@src/types";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ProjectLayout = ({
  children,
  meta,
}: {
  children: ReactNode;
  meta: Project;
}) => {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="my-16">
        <h1 className="mb-8 text-4xl font-black leading-tight md:text-5xl">
          {meta.name}
        </h1>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
          <Image
            src={meta.images[imgIndex]}
            layout="fill"
            objectFit="cover"
            alt={`${meta.name} - Screenshot`}
          />
        </div>
        <div className="my-6 flex flex-row flex-wrap gap-4">
          {meta.images.map((img, i) => (
            <button
              key={i}
              className={`relative aspect-[3/2] w-24 overflow-hidden rounded-lg md:w-32 ${
                imgIndex === i
                  ? "ring-2 ring-indigo-500 ring-offset-4 ring-offset-white dark:ring-indigo-500 dark:ring-offset-gray-900"
                  : ""
              }`}
              onClick={() => setImgIndex(i)}
            >
              <Image
                src={img}
                layout="fill"
                objectFit="cover"
                alt={`${meta.name} - Thumbnail`}
              />
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {meta.url && (
            <Link href={meta.url}>
              <a
                target="_blank"
                className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>View</span>
                <FaExternalLinkAlt />
              </a>
            </Link>
          )}
          {meta.repo && (
            <Link href={meta.repo}>
              <a
                target="_blank"
                className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>Git Repo</span>
                <FaGithub />
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className="prose prose-lg my-16 min-w-0 max-w-full dark:prose-invert">
        {children}
      </div>
    </div>
  );
};

export default ProjectLayout;
