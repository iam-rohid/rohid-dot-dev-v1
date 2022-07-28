import { Post } from "@src/types";
import moment from "moment";
import Link from "next/link";
import React from "react";

const PostListItem = ({ post }: { post: Post }) => {
  return (
    <article className="relative flex flex-col gap-2">
      <Link href={`/blog/${post.slug}`}>
        <a>
          <h3 className="text-xl font-bold underline-offset-1 hover:underline">
            {post.title}
          </h3>
        </a>
      </Link>
      <p className="text-gray-700 line-clamp-2 dark:text-gray-300">
        {post.excerpt}
      </p>
      <div className="inline-flex items-center gap-4 text-gray-600 dark:text-gray-400">
        <span>{moment(post.publishedAt).format("MMM DD, YYYY")}</span>
      </div>
    </article>
  );
};

export default PostListItem;
