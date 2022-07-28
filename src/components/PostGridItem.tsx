import { IPost } from "@src/models";
import moment from "moment";
import Link from "next/link";
import React from "react";

export type PostGridItemProps = {
  data: IPost;
};

const PostGridItem = (props: PostGridItemProps) => {
  const { data } = props;
  return (
    <article className="relative flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-gray-700">
      <Link href={`/blog/${data.slug}`}>
        <a className="absolute inset-0 rounded-xl" />
      </Link>

      <h3 className="text-xl font-medium">{data.title}</h3>
      <div className="mt-auto flex items-center gap-4 text-gray-600 dark:text-gray-400">
        <p className="flex-1">
          {moment(data.publishedAt).format("MMM DD, YYYY")}
        </p>
      </div>
    </article>
  );
};

export default PostGridItem;
