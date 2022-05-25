import React from "react";

export type BlogFrontmatter = {
  private: boolean;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  featured: boolean;
};

export type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="mx-auto my-16 flex w-full max-w-screen-lg flex-col-reverse gap-6 px-4 md:flex-row lg:gap-8">
      <div className="flex min-w-0 max-w-full flex-1 flex-col">
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
