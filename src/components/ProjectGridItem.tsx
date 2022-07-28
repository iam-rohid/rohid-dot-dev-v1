import Link from "next/link";
import Image from "next/image";
import React from "react";
import imageUrl from "@src/lib/imageUrl";
import { ITag, ICategory, IProject } from "@src/models";

const ProjectGridItem = ({
  project,
}: {
  project: IProject & {
    tags: ITag[];
    category: ICategory;
  };
}) => {
  return (
    <article className="relative flex flex-col gap-4 rounded-xl bg-white py-4 px-2 shadow-md ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-gray-700">
      <Link href={`/projects/${project.slug}`}>
        <a className="absolute inset-0 rounded-xl" />
      </Link>

      <h3 className="px-2 text-xl font-medium">{project.title}</h3>

      <div className="pointer-events-none relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={imageUrl(project.images[0]).url()}
          alt="Project"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex items-center gap-4 px-2 text-gray-600 dark:text-gray-300">
        <ul className="flex flex-1 flex-wrap items-center gap-2">
          {project.tags.map((tag) => {
            return (
              <li key={tag.slug}>
                <Link href={`/tags/${tag.slug}`}>
                  <a className="relative z-10 inline-block rounded-md bg-gray-100 px-2 py-1 hover:text-gray-900 dark:bg-gray-800 dark:hover:text-gray-100">
                    #{tag.slug}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default ProjectGridItem;
