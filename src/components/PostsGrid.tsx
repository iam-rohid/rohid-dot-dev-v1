import { IPost } from "@src/models";
import React from "react";
import PostGridItem from "./PostGridItem";
import Section, { SectionProps } from "./Section";

const PostsGrid = (
  props: { data: IPost[] } & Omit<SectionProps, "children">
) => {
  const { data, ...sectionProps } = props;
  if (!data || data.length === 0) return null;
  return (
    <Section {...sectionProps} className="my-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <PostGridItem data={post} key={post.slug} />
        ))}
      </div>
    </Section>
  );
};

export default PostsGrid;
