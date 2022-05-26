import { Post } from "@src/types";
import moment from "moment";
import Link from "next/link";
import React from "react";

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <article key={post.slug} className="group relative flex flex-col gap-2">
      <Link href={`/blog/${post.slug}`}>
        <a className="absolute inset-0" />
      </Link>
      <h3 className="text-xl font-medium underline-offset-4 group-hover:underline">
        {post.title}
      </h3>
      <p className="text-gray-600 line-clamp-2 dark:text-gray-300">
        {post.description}
      </p>
      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
        <p>{moment(post.updatedAt).format("MMM DD, YYYY")}</p>
        {/* <p>3.5min read</p>
            <div className="flex items-center gap-2">
              <MdVisibility className="text-xl" />
              <span>31,456</span>
            </div> */}
      </div>
    </article>
  );
};

export default BlogCard;
