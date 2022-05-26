import moment from "moment";
import Link from "next/link";
import { useMemo } from "react";
import { Post } from "@src/types";
import { posts } from "@src/data";

const BlogPage = () => {
  const allPosts = useMemo(
    () =>
      posts
        .filter((blog) => !blog.isPrivate)
        .sort((a, b) =>
          Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
        ) as Post[],
    []
  );

  return (
    <div className="mx-auto my-16 mb-2 flex max-w-screen-lg items-center gap-4 px-4">
      <section id="recent-posts">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="flex-1 text-2xl font-medium">All Posts</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {allPosts.map((blog) => (
            <article
              key={blog.slug}
              className="group relative flex flex-col gap-2"
            >
              <Link href={`/blog/${blog.slug}`}>
                <a className="absolute inset-0" />
              </Link>

              <h3 className="text-xl font-medium underline-offset-4 group-hover:underline">
                {blog.title}
              </h3>

              <p className="text-gray-600 line-clamp-2 dark:text-gray-300">
                {blog.description}
              </p>

              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <p>{moment(blog.updatedAt).format("MMM DD, YYYY")}</p>
                {/* <p>3.5min read</p>
                    <div className="flex items-center gap-2">
                      <MdVisibility className="text-xl" />
                      <span>31,456</span>
                    </div> */}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
