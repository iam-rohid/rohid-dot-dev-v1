import { useMemo, useState } from "react";
import { Post } from "@src/types";
import { posts } from "@src/data";
import { GetStaticProps } from "next";
import { MdSearch } from "react-icons/md";
import BlogCard from "@src/components/Cards/BlogCard";

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
      <section className="my-16">
        <div className="mb-6 flex items-center gap-4">
          <h1 className="flex-1 text-4xl font-black">Blog</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            className="h-12 w-full appearance-none rounded-xl border-none bg-transparent pr-4 pl-12 text-base outline-none ring-1 ring-gray-200 focus:bg-transparent focus:ring-indigo-500 dark:ring-gray-700 dark:focus:ring-indigo-500"
            placeholder="Search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl" />
        </div>
      </section>
      {searchKey ? (
        <section id="recent-posts" className="my-16">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="flex-1 text-2xl font-medium">
              Search Results {searchedPosts.length}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {searchedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section id="recent-posts" className="my-16">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="flex-1 text-2xl font-medium">Popular Posts</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {popularPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
          <section id="recent-posts" className="my-16">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="flex-1 text-2xl font-medium">All Posts</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {allPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
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
