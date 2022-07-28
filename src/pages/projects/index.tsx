import ProjectGridItem from "@src/components/ProjectGridItem";
import PageHeader from "@src/components/PageHeader";
import SearchBar from "@src/components/SearchBar";
import SectionTitle from "@src/components/SectionTitle";
import { projects } from "@src/data";
import { Project } from "@src/types";
import { GetStaticProps } from "next";
import React, { useMemo, useState } from "react";

type ProjectsPageProps = {
  allProjects: Project[];
  featuredProjects: Project[];
};

const ProjectsPage = ({ allProjects, featuredProjects }: ProjectsPageProps) => {
  const [searchKey, setSearchKey] = useState("");

  const searchedProjects = useMemo(() => {
    const keys = searchKey.toLowerCase().split(" ");
    if (keys.length === 0) return [];
    return allProjects.filter((post) => {
      const title = post.name.toLowerCase();
      const content = (post.description || "").toLowerCase();
      return keys.every((key) => title.includes(key) || content.includes(key));
    });
  }, [searchKey, allProjects]);

  return (
    <div className="mx-auto mb-2 max-w-5xl px-4">
      <PageHeader title="Projects">
        <SearchBar value={searchKey} onChange={setSearchKey} />
      </PageHeader>

      {searchKey ? (
        <SectionTitle
          className="my-16"
          title={`Search Results ${searchedProjects.length}`}
        >
          <ProjectsGird projects={searchedProjects} />
        </SectionTitle>
      ) : (
        <>
          <SectionTitle className="my-16" title="Featured Projects">
            <ProjectsGird projects={featuredProjects} />
          </SectionTitle>
          <SectionTitle className="my-16" title="All Projects">
            <ProjectsGird projects={allProjects} />
          </SectionTitle>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;

const ProjectsGird = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectGridItem key={project.slug} project={project} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = () => {
  const allProjects = projects.sort((a, b) =>
    Date.parse(a.date) > Date.parse(b.date) ? -1 : 1
  );
  const featuredProjects = allProjects.filter((post) => post.isFeatured);

  return {
    props: {
      allProjects,
      featuredProjects,
    },
    revalidate: 60,
  };
};
