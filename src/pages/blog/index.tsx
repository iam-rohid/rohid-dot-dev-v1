import { useMemo, useState } from "react";
import { Post } from "@src/types";
import { GetStaticProps } from "next";
import BlogCard from "@src/components/Cards/BlogCard";
import PageHeader from "@src/components/PageHeader";
import SearchBar from "@src/components/SearchBar";
import SectionTitle from "@src/components/SectionTitle";
import { getAllPosts } from "@src/utils/post-service";

type BlogPageProps = {
  allPosts: Post[];
  popularPosts: Post[];
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
    <div className="mx-auto mb-2 max-w-4xl px-4">
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
              {popularPosts?.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </SectionTitle>
          <SectionTitle
            className="my-16"
            title={`All Posts ${allPosts.length}`}
          >
            <div className="grid grid-cols-1 gap-6">
              {allPosts?.map((post) => (
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

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const allPosts = await getAllPosts();
  const popularPosts = allPosts
    .sort((a, b) => (a.views > b.views ? -1 : 1))
    .slice(0, 5);

  return {
    props: {
      allPosts,
      popularPosts,
    },
    revalidate: 60,
  };
};
