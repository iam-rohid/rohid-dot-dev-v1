import React from "react";
import moment from "moment";

export type BlogFrontmatter = {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  authors?: string[];
};
export type BlogLayoutProps = {
  children: React.ReactNode;
  frontmatter: BlogFrontmatter;
};

const BlogLayout = ({ children, frontmatter }: BlogLayoutProps) => {
  console.log({ frontmatter });
  return (
    <div className="mx-auto my-16 flex w-full max-w-screen-lg flex-col-reverse gap-6 px-4 md:flex-row lg:gap-8">
      <div className="flex min-w-0 max-w-full flex-1 flex-col">
        <h1 className="mb-2 text-4xl font-black leading-tight">
          {frontmatter.title}
        </h1>
        <p>
          {frontmatter.date && (
            <span className="text-gray-600 dark:text-gray-300">
              Published at{" "}
              {moment(Date.parse(frontmatter.date)).format("MMMM DD, YYYY")}
            </span>
          )}
        </p>

        <div className="prose prose-lg min-w-0 max-w-full dark:prose-invert">
          {children}
        </div>
      </div>
      <aside className="md:w-64">
        <div className="sticky top-0">Hello world</div>
      </aside>
    </div>
  );
};

export default BlogLayout;
