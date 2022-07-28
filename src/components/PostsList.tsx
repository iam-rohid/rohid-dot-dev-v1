import { IPost } from "@src/models";
import React from "react";
import PostListItem from "./PostListItem";
import Section, { SectionProps } from "./Section";

export type PostsListProps = Omit<SectionProps, "children"> & {
  data: IPost[];
};
const PostsList = (props: PostsListProps) => {
  const { data, ...sectionProps } = props;

  if (!data || data.length === 0) return null;

  return (
    <Section {...sectionProps} className="my-16">
      <div className="space-y-8">
        {data.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
};

export default PostsList;
