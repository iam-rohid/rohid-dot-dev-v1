import { GetStaticProps } from "next";
import PageHeader from "@src/components/PageHeader";
import { IPost } from "@src/models";
import { sanityClient } from "@src/lib/sanityClient";
import PostsGrid from "@src/components/PostsGrid";
import PostsList from "@src/components/PostsList";

type Props = {
  featuredPosts: IPost[];
  posts: IPost[];
};

const BlogListPage = (props: Props) => {
  const { featuredPosts, posts } = props;

  return (
    <div className="container mx-auto mb-2 px-4 xl:max-w-5xl">
      <PageHeader title="Blog" />
      <PostsGrid title="Featured Posts" data={featuredPosts} />
      <PostsList title="All Posts" data={posts} />
    </div>
  );
};

export default BlogListPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts =
    await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc, title asc){
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
  const { featuredPosts } = await sanityClient.fetch(
    `*[_type == "siteSettings" && _id == $docId][0]{
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
  }`,
    {
      docId: process.env.NEXT_PUBLIC_SITE_SETTINGS_DOC_ID || "site-settings",
    }
  );

  return {
    props: { posts, featuredPosts },
    revalidate: 60,
  };
};
