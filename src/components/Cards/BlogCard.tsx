import { Post } from "@src/types";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { MdVisibility } from "react-icons/md";

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <article key={post.slug} className="group relative flex flex-col gap-2">
      <Link href={`/blog/${post.slug}`}>
        <a className="absolute inset-0" />
      </Link>
      <h3 className="text-xl font-medium underline-offset-4 group-hover:underline">
        {post.title}
      </h3>
      <p className="text-gray-700 line-clamp-2 dark:text-gray-300">
        {post.description}
      </p>
      <div className="inline-flex items-center gap-4 text-gray-600 dark:text-gray-400">
        <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        {/* <span>3.5min read</span> */}
        <span className="inline-flex items-center gap-2">
          <MdVisibility className="text-xl" />
          <span>{(post.views || 0).toLocaleString()} views</span>
        </span>
      </div>
    </article>
  );
};

export default BlogCard;
