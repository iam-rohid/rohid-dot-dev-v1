import { Project } from "@src/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { tags } from "@src/data";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <article className="relative flex flex-col gap-4 rounded-xl bg-white py-4 px-2 shadow-md ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-gray-700">
      <Link href={`/projects/${project.slug}`}>
        <a className="absolute inset-0 rounded-xl" />
      </Link>

      <h3 className="px-2 text-xl font-medium">{project.name}</h3>

      <div className="pointer-events-none relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
        <Image
          src={project.coverPhoto}
          alt="Project"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex items-center gap-4 px-2 text-gray-600 dark:text-gray-300">
        <ul className="flex flex-1 flex-wrap items-center gap-2">
          {project.tags.map((tag) => {
            const _tag = tags.find((t) => t.slug === tag);
            if (!_tag) return null;
            return (
              <li key={_tag.slug}>
                <Link href={`/tags/${_tag.slug}`}>
                  <a className="relative z-10 inline-block rounded-md bg-gray-100 px-2 py-1 text-sm hover:text-gray-900 dark:bg-gray-800 dark:hover:text-gray-100">
                    {_tag.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <div className="flex items-center gap-2">
                      <MdStar className="text-xl" />
                      <span>31,456</span>
                    </div> */}
      </div>
    </article>
  );
};

export default ProjectCard;
