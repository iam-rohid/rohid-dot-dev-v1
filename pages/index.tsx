import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight, MdStar, MdVisibility } from "react-icons/md";

const Home: NextPage = () => {
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
        <div className="mx-auto max-w-screen-lg px-4">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="flex-1 text-2xl font-medium">Featured Posts</h2>
            <Link href="/blog">
              <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                <span>All Posts</span>
                <MdChevronRight className="text-2xl" />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <article
                key={item}
                className="relative flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md ring-1 ring-gray-200 hover:shadow-lg dark:bg-gray-700 dark:shadow-none dark:ring-0 dark:ring-gray-600 dark:hover:ring-1"
              >
                <Link href={`/`}>
                  <a className="absolute inset-0 rounded-xl" />
                </Link>

                <h3 className="text-xl font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                  impedit.
                </h3>

                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <p className="flex-1">June 1, 2020</p>
                  <div className="flex items-center gap-2">
                    <MdVisibility className="text-xl" />
                    <span>31,456</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-projects">
        <div className="mx-auto max-w-screen-lg px-4">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="flex-1 text-2xl font-medium">Featured Projects</h2>
            <Link href="/projects">
              <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                <span>All Projects</span>
                <MdChevronRight className="text-2xl" />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <article
                key={item}
                className="relative flex flex-col gap-4 rounded-xl bg-white py-4 px-2 shadow-md ring-1 ring-gray-200 hover:shadow-lg dark:bg-gray-700 dark:shadow-none dark:ring-0 dark:ring-gray-600 dark:hover:ring-1"
              >
                <Link href={`/`}>
                  <a className="absolute inset-0 rounded-xl" />
                </Link>

                <h3 className="px-2 text-xl font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                  impedit.
                </h3>

                <div className="pointer-events-none relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={`/images/project-photo-02.jpg`}
                    alt="Project"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className="flex items-center gap-4 px-2 text-gray-600 dark:text-gray-300">
                  <ul className="flex flex-1 flex-wrap items-center gap-2">
                    {[
                      {
                        id: "react",
                        name: "React",
                      },
                      {
                        id: "typescript",
                        name: "TypeScript",
                      },
                    ].map(({ id, name }) => (
                      <li key={id}>
                        <Link href={`/tags/${id}`}>
                          <a className="relative z-10 inline-block rounded bg-gray-100 px-2 py-1 text-sm hover:text-gray-900 dark:bg-gray-600 dark:hover:text-gray-100">
                            {name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2">
                    <MdStar className="text-xl" />
                    <span>31,456</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-screen-lg gap-6 px-4">
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
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <article
                  key={item}
                  className="group relative flex flex-col gap-2"
                >
                  <Link href={`/`}>
                    <a className="absolute inset-0" />
                  </Link>

                  <h3 className="text-xl font-medium underline-offset-4 group-hover:underline">
                    Benefits of choosing React JS for your projects
                  </h3>

                  <p className="text-gray-600 line-clamp-2 dark:text-gray-300">
                    ReactJS is an open-source, declarative, efficient,
                    component-based front-end JavaScript library maintained by
                    the social networking giant Facebook. It is used to build
                    user interfaces tailored only for the view layer of web and
                    mobile applications.
                  </p>

                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <p>June 1, 2020</p>
                    <p>3.5min read</p>
                    <div className="flex items-center gap-2">
                      <MdVisibility className="text-xl" />
                      <span>31,456</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="w-full max-w-xs space-y-16">
          <section id="categories">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="flex-1 text-2xl font-medium">Categories</h2>
            </div>
            <ul className="flex w-full flex-wrap gap-2">
              {[
                {
                  id: "react",
                  name: "React",
                },
                {
                  id: "typescript",
                  name: "TypeScript",
                },
                {
                  id: "next-js",
                  name: "Next.js",
                },
                {
                  id: "node-js",
                  name: "Node.js",
                },
                {
                  id: "figma",
                  name: "Figma",
                },
                {
                  id: "flutter",
                  name: "Flutter",
                },
              ].map(({ id, name }) => (
                <li key={id}>
                  <Link href={`/tags/${id}`}>
                    <a className="relative z-10 inline-block rounded bg-gray-100 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
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
              {[1, 2, 3, 4, 5].map((item) => (
                <Link href={`/`} key={item}>
                  <a className="flex">
                    <p className="w-8 text-2xl font-bold text-gray-200 dark:text-gray-600">
                      {item}
                    </p>
                    <h3 className="flex-1 text-lg font-medium underline-offset-2 hover:underline">
                      Benefits of choosing React JS for your projects
                    </h3>
                  </a>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
