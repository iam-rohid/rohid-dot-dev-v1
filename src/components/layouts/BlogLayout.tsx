import { posts, tags } from "@src/data";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

export type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const router = useRouter();
  const post = useMemo(() => {
    const slug = router.pathname.split("/")[2];
    return posts.find((proejct) => proejct.slug === slug);
  }, [router]);

  const postTags = useMemo(
    () => tags.filter((tag) => post.tags.find((t) => t === tag.slug)),
    [post]
  );

  return (
    <div className="mx-auto my-16 w-full max-w-screen-lg px-4">
      <h1 className="mb-8 text-4xl font-black leading-tight md:text-5xl">
        {post.title}
      </h1>
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
