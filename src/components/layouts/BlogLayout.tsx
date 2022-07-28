import { Post, Tag } from "@src/types";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { MdVisibility } from "react-icons/md";

export type BlogLayoutProps = {
  children: React.ReactNode;
  meta: Post;
};

const BlogLayout = ({ children, meta }: BlogLayoutProps) => {
  const [post, setPost] = useState(meta);
  const [postTags, setPostTags] = useState<Tag[]>([]);

  return (
    <div className="container mx-auto my-16 w-full px-4 xl:max-w-5xl">
      <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">
        {post.title}
      </h1>
      <div className="mb-4 inline-flex items-center gap-4 text-gray-600 dark:text-gray-400">
        <span>{moment(post.publishedAt).format("MMM DD, YYYY")}</span>
        <span>{"·"}</span>
        <span className="inline-flex items-center gap-2">
          <MdVisibility />
          {post.views ? `${post.views.toLocaleString()} views` : "loading..."}
        </span>
      </div>
      <ul className="flex w-full flex-wrap gap-2">
        {postTags.map(({ slug, name }) => (
          <li key={slug}>
            <Link href={`/tags/${slug}`}>
              <a className="relative z-10 inline-block rounded-lg bg-gray-100 px-2 py-1 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="prose prose-lg my-16 min-w-0 max-w-full dark:prose-invert">
        {children}
      </div>
    </div>
  );
};

export default BlogLayout;
