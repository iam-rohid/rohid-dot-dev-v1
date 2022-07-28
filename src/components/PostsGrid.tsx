import { IPost } from "@src/models";
import React from "react";
import PostGridItem from "./PostGridItem";
import SectionTitle, { SectionProps } from "./SectionTitle";

const PostsGrid = (
  props: { data: IPost[] } & Omit<SectionProps, "children">
) => {
  const { data, ...section } = props;
  return (
    <SectionTitle {...section} className="my-32">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <PostGridItem data={post} key={post.slug} />
        ))}
      </div>
    </SectionTitle>
  );
};

export default PostsGrid;
