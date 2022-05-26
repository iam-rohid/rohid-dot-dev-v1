import moment from "moment";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Post } from "@src/types";
import { posts, tags, projects } from "@src/data";
import BlogCard from "@src/components/Cards/BlogCard";
import SectionTitle from "@src/components/SectionTitle";
import ProjectCard from "@src/components/Cards/ProjectCard";

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
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="mx-auto w-full max-w-screen-lg px-4">
        <section className="my-16">
          <div className="flex flex-col-reverse items-center gap-16 md:flex-row">
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-1 text-4xl font-black">
                Hi 👋, I&apos;m Rohid
              </h1>
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

        <SectionTitle
          title="Featured Posts"
          id="featured-posts"
          moreLink={{
            text: "All Posts",
            href: "/blog",
          }}
          className="my-16"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="relative flex min-w-[300px] flex-col gap-4 rounded-xl bg-white p-4 shadow-md ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-gray-700"
              >
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
            ))}
          </div>
        </SectionTitle>

        <SectionTitle
          title="Featured Projects"
          id="featured-projects"
          moreLink={{
            text: "ALl Projects",
            href: "/projects",
          }}
          className="my-16"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </SectionTitle>

        <div className="my-16 flex flex-col gap-16 md:flex-row md:gap-4">
          <div className="flex-1">
            <SectionTitle
              title="Recent Posts"
              id="recent-posts"
              moreLink={{
                text: "All Posts",
                href: "/blog",
              }}
            >
              <div className="grid grid-cols-1 gap-6">
                {recentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </SectionTitle>
          </div>

          <aside className="w-full md:max-w-[260px] lg:max-w-[320px]">
            <div className="grid w-full grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-6 md:grid-cols-1 md:gap-16">
              <SectionTitle title="Featured Tags" id="top-tags">
                <ul className="flex w-full flex-wrap gap-2">
                  {featuredTags.map(({ slug, name }) => (
                    <li key={slug}>
                      <Link href={`/tags/${slug}`}>
                        <a className="relative z-10 inline-block rounded-lg bg-gray-100 px-2 py-1 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                          {name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SectionTitle>

              <SectionTitle title="Popular Posts" id="popular-posts">
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
              </SectionTitle>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Home;
