import moment from "moment";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PostListItem from "@src/components/PostListItem";
import SectionTitle from "@src/components/SectionTitle";
import ProjectGridItem from "@src/components/ProjectGridItem";
import { sanityClient } from "@src/lib/sanityClient";
import { useEffect } from "react";
import {
  ICategory,
  IMeta,
  IPost,
  IProject,
  ISiteHeader,
  ITag,
} from "@src/models";
import imageUrl from "@src/lib/imageUrl";
import AboutMe from "@src/components/AboutMe";
import PostsGrid from "@src/components/PostsGrid";
import ProjectsGrid from "@src/components/ProjectsGrid";
import PostsList from "@src/components/PostsList";

type Props = {
  header: ISiteHeader;
  featuredPosts: (IPost & {
    tags: ITag[];
    category: ICategory;
  })[];
  recentPosts: (IPost & {
    tags: ITag[];
    category: ICategory;
  })[];
  featuredProjects: (IProject & {
    tags: ITag[];
    category: ICategory;
  })[];
  featuredTags: ITag[];
  meta: IMeta;
};

const HomePage: NextPage<Props> = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const {
    featuredPosts,
    featuredProjects,
    featuredTags,
    header: aboutMe,
    meta,
    recentPosts,
  } = props;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(", ")} />
      </Head>
      <div className="container mx-auto w-full px-4 xl:max-w-5xl">
        <AboutMe data={aboutMe} />

        <PostsGrid
          title="Featured Posts"
          id="featured-posts"
          data={featuredPosts}
          moreLink={{
            text: "All Posts",
            href: "/blog",
          }}
        />

        <ProjectsGrid
          title="Featured Projects"
          id="featured-projects"
          data={featuredProjects}
          moreLink={{
            text: "All Projects",
            href: "/projects",
          }}
        />

        <PostsList
          title="Recent Posts"
          id="recent-posts"
          data={recentPosts}
          moreLink={{
            text: "All Posts",
            href: "/blog",
          }}
        />
      </div>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await sanityClient.fetch(
    /* groq */ `*[_type == "siteSettings" && _id == $docId][0]{
    ...,
    featuredProjects[]->{
      title,
      "slug": slug.current,
      images,
      category->{
        "slug": slug.current,
        title,
      },
      tags[]->{
        "slug": slug.current,
        title,
      }
    },
    featuredPosts[]->{
      "slug": slug.current,
      title,
      excerpt,
      publishedAt,
      category->{
        "slug": slug.current,
        title,
      },
      tags[]->{
        "slug": slug.current,
        title,
      }
    },
    featuredTags[]->{
      "slug": slug.current,
      title,
    },
  }`,
    {
      docId: process.env.NEXT_PUBLIC_SITE_SETTINGS_DOC_ID || "site-settings",
    }
  );
  const recentPosts =
    await sanityClient.fetch(/* groq */ `*[_type == "post" && publishedAt < now()] | order(publishedAt desc)[0..9]{
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    category->{
      "slug": slug.current,
      title,
    },
    tags[]->{
      "slug": slug.current,
      title,
    }
  }`);
  const { header, featuredProjects, featuredPosts, featuredTags, meta } = data;
  return {
    props: {
      header,
      featuredProjects,
      featuredPosts,
      featuredTags,
      meta,
      recentPosts,
    },
    revalidate: 60,
  };
};
