import { IProject, ITag } from "@src/models";
import React from "react";
import ProjectGridItem from "./ProjectGridItem";
import SectionTitle, { SectionProps } from "./SectionTitle";

export type ProjectsGridProps = Omit<SectionProps, "children"> & {
  data: (IProject & {
    tags: ITag[];
  })[];
};

const ProjectsGrid = (props: ProjectsGridProps) => {
  const { data, ...sectionProps } = props;
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <SectionTitle {...sectionProps} className="my-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((project) => (
          <ProjectGridItem key={project.slug} project={project} />
        ))}
      </div>
    </SectionTitle>
  );
};

export default ProjectsGrid;
