import moment from "moment";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { MdChevronRight } from "react-icons/md";
import { Post } from "@src/types";
import { posts, tags, projects } from "@src/data";
import BlogCard from "@src/components/Cards/BlogCard";

const Home: NextPage = () => {
  const recentPosts = useMemo(
    () =>
      posts
        .filter((blog) => !blog.isPrivate)
        .sort((a, b) =>
          Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
        )
        .slice(0, 10) as Post[],
    []
  );

  const featuredPosts = useMemo(
    () =>
      posts
        .filter((blog) => !blog.isPrivate)
        .sort((a, b) =>
          Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
        )
        .filter((blog) => blog.isFeatured)
        .slice(0, 10) as Post[],
    []
  );

  const popularPosts = useMemo(
    () =>
      posts
        .filter((blog) => !blog.isPrivate)
        .sort((a, b) =>
          Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
        )
        .filter((blog) => blog.isPopular)
        .slice(0, 5) as Post[],
    []
  );

  const featuredTags = useMemo(
    () =>
      tags
        .filter((tag) => tag.isFeatured)
        .sort((a, b) => (a.name > b.name ? 1 : -1)),
    []
  );

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.isFeatured).slice(0, 3),
    []
  );

  return (
    <main className="my-16 space-y-16">
      <Head>
        <title>Home - Rohid</title>
      </Head>
      <section>
        <div className="mx-auto flex w-full max-w-screen-lg flex-col-reverse items-center gap-16 px-4 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-1 text-4xl font-bold">Hi 👋, I&apos;m Rohid</h1>
            <p className="mb-3 text-lg">Full-Stack Software developer</p>
            <p className="text-gray-600 dark:text-gray-300">
              I&apos;m a passionate software developer based in Bangladesh. I
              love to solve problems and build awesome products. I&apos;m a
              self-taught developer and learning new things every day.
            </p>
          </div>
          <div className="relative h-48 w-48 overflow-hidden rounded-full">
            <Image
              src="/images/profile.jpeg"
              alt="Rohid"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section id="featured-posts">
        <div className="mx-auto mb-2 flex max-w-screen-lg items-center gap-4 px-4">
          <h2 className="flex-1 text-2xl font-medium">Featured Posts</h2>
          <Link href="/blog">
            <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
              <span>All Posts</span>
              <MdChevronRight className="text-2xl" />
            </a>
          </Link>
        </div>

        <div className="mx-auto max-w-screen-lg overflow-x-auto">
          <div className="grid grid-flow-col py-4 pl-4">
            {featuredPosts.map((post) => (
              <div key={post.slug} className="pr-4">
                <article className="relative flex min-w-[300px] flex-col gap-4 rounded-xl bg-white p-4 shadow-md ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600">
                  <Link href={`/blog/${post.slug}`}>
                    <a className="absolute inset-0 rounded-xl" />
                  </Link>

                  <h3 className="text-xl font-medium">{post.title}</h3>

                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <p className="flex-1">
                      {moment(post.createdAt).format("MMM DD, YYYY")}
                    </p>
                    {/* <div className="flex items-center gap-2">
                      <MdVisibility className="text-xl" />
                      <span>31,456</span>
                    </div> */}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-projects">
        <div className="mx-auto mb-2 flex max-w-screen-lg items-center gap-4 px-4">
          <h2 className="flex-1 text-2xl font-medium">Featured Projects</h2>
          <Link href="/projects">
            <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
              <span>All Projects</span>
              <MdChevronRight className="text-2xl" />
            </a>
          </Link>
        </div>

        <div className="mx-auto max-w-screen-lg overflow-x-auto">
          <div className="grid grid-flow-col py-4 pl-4">
            {featuredProjects.map((project) => (
              <div className="pr-4" key={project.slug}>
                <article className="relative flex min-w-[300px] flex-col gap-4 rounded-xl bg-white py-4 px-2 shadow-md ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600">
                  <Link href={`/projects/${project.slug}`}>
                    <a className="absolute inset-0 rounded-xl" />
                  </Link>

                  <h3 className="px-2 text-xl font-medium">{project.name}</h3>

                  <div className="pointer-events-none relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={project.coverPhoto}
                      alt="Project"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="flex items-center gap-4 px-2 text-gray-600 dark:text-gray-300">
                    <ul className="flex flex-1 flex-wrap items-center gap-2">
                      {project.tags.map((tag) => {
                        const _tag = tags.find((t) => t.slug === tag);
                        if (!_tag) return null;

                        return (
                          <li key={_tag.slug}>
                            <Link href={`/tags/${_tag.slug}`}>
                              <a className="relative z-10 inline-block rounded-md bg-gray-100 px-2 py-1 text-sm hover:text-gray-900 dark:bg-gray-700 dark:hover:text-gray-100">
                                {_tag.name}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    {/* <div className="flex items-center gap-2">
                      <MdStar className="text-xl" />
                      <span>31,456</span>
                    </div> */}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-16 px-4 md:flex-row md:gap-4">
        <div className="flex-1">
          <section id="recent-posts">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="flex-1 text-2xl font-medium">Recent Posts</h2>
              <Link href="/blog">
                <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                  <span>All Posts</span>
                  <MdChevronRight className="text-2xl" />
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full md:max-w-[260px] lg:max-w-[320px]">
          <div className="grid w-full grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-6 md:grid-cols-1 md:gap-16">
            <section id="categories">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="flex-1 text-2xl font-medium">Featured Tags</h2>
              </div>
              <ul className="flex w-full flex-wrap gap-2">
                {featuredTags.map(({ slug, name }) => (
                  <li key={slug}>
                    <Link href={`/tags/${slug}`}>
                      <a className="relative z-10 inline-block rounded-lg bg-gray-100 px-3 py-1.5 text-gray-600 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                        {name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section id="popular-posts">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="flex-1 text-2xl font-medium">Popular Posts</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {popularPosts.map((post, i) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <a className="flex">
                      <p className="w-8 text-2xl font-bold text-gray-200 dark:text-gray-600">
                        {i}
                      </p>
                      <h3 className="flex-1 text-lg font-medium underline-offset-2 hover:underline">
                        {post.title}
                      </h3>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Home;
