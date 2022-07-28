import PageHeader from "@src/components/PageHeader";
import { GetStaticProps } from "next";
import React from "react";
import { ICategory, IProject, ITag } from "@src/models";
import ProjectsGrid from "@src/components/ProjectsGrid";
import { sanityClient } from "@src/lib/sanityClient";

type ProjectsPageProps = {
  projects: (IProject & { tags: ITag[]; category: ICategory })[];
  featuredProjects: (IProject & { tags: ITag[]; category: ICategory })[];
};

const ProjectsPage = (props: ProjectsPageProps) => {
  const { featuredProjects, projects } = props;

  return (
    <div className="mx-auto mb-2 max-w-5xl px-4">
      <PageHeader title="Projects" />
      <ProjectsGrid title="Featured Projects" data={featuredProjects} />
      <ProjectsGrid title="All Projects" data={projects} />
    </div>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const projects =
    await sanityClient.fetch(`*[_type == "project" && publishedAt < now()] | order(publishedAt desc, title asc){
    title,
    "slug": slug.current,
    images,
    category->{
      "slug": slug.current,
      title,
    },
    tags[]->{
      "slug": slug.current,
      title,
    }
  }`);
  const { featuredProjects } = await sanityClient.fetch(
    `*[_type == "siteSettings" && _id == $docId][0]{
    featuredProjects[]->{
      title,
      "slug": slug.current,
      images,
      category->{
        "slug": slug.current,
        title,
      },
      tags[]->{
        "slug": slug.current,
        title,
      }
    },
  }`,
    {
      docId: process.env.NEXT_PUBLIC_SITE_SETTINGS_DOC_ID || "site-settings",
    }
  );

  return {
    props: {
      projects,
      featuredProjects,
    },
    revalidate: 60,
  };
};
