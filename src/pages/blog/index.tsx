import { useMemo, useState } from "react";
import { Post } from "@src/types";
import { posts } from "@src/data";
import { GetStaticProps } from "next";
import BlogCard from "@src/components/Cards/BlogCard";
import PageHeader from "@src/components/PageHeader";
import SearchBar from "@src/components/SearchBar";
import SectionTitle from "@src/components/SectionTitle";

type BlogPageProps = {
  popularPosts: Post[];
  allPosts: Post[];
};

const BlogPage = ({ allPosts, popularPosts }: BlogPageProps) => {
  const [searchKey, setSearchKey] = useState("");
  const searchedPosts = useMemo(() => {
    const keys = searchKey.toLowerCase().split(" ");
    if (keys.length === 0) return [];
    return allPosts.filter((post) => {
      const title = post.title.toLowerCase();
      const content = post.description.toLowerCase();
      return keys.every((key) => title.includes(key) || content.includes(key));
    });
  }, [searchKey, allPosts]);

  return (
    <div className="mx-auto mb-2 max-w-screen-lg px-4">
      <PageHeader title="Blog">
        <SearchBar value={searchKey} onChange={setSearchKey} />
      </PageHeader>
      {searchKey ? (
        <SectionTitle
          className="my-16"
          title={`Search Results ${searchedPosts.length}`}
        >
          <div className="grid grid-cols-1 gap-6">
            {searchedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </SectionTitle>
      ) : (
        <>
          <SectionTitle className="my-16" title="Popular Posts">
            <div className="grid grid-cols-1 gap-6">
              {popularPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </SectionTitle>
          <SectionTitle className="my-16" title="All Posts">
            <div className="grid grid-cols-1 gap-6">
              {allPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </SectionTitle>
        </>
      )}
    </div>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps<BlogPageProps> = () => {
  const allPosts = posts
    .filter((post) => !post.isPrivate)
    .sort((a, b) => {
      const dateA = Date.parse(a.createdAt);
      const dateB = Date.parse(b.createdAt);
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
  const popularPosts = allPosts.filter((post) => post.isPopular);

  return {
    props: {
      allPosts,
      popularPosts,
      tags: [],
    },
  };
};
