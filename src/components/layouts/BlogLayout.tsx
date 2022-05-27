import { posts, tags } from "@src/data";
import { Post, Tag } from "@src/types";
import firebaseApp from "@src/utils/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import moment from "moment";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { MdVisibility } from "react-icons/md";

export type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const [viewAdded, setViewAdded] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [postTags, setPostTags] = useState<Tag[]>([]);

  const router = useRouter();

  useLayoutEffect(() => {
    if (!post) {
      const slug = router.pathname.split("/")[2];
      const _post = posts.find((proejct) => proejct.slug === slug);
      const _tags = tags.filter((tag) =>
        _post.tags.find((t) => t === tag.slug)
      );
      setPost(_post);
      setPostTags(_tags);
    }
  }, [router.pathname, post]);

  useLayoutEffect(() => {
    const loadPost = async () => {
      const db = getFirestore(firebaseApp);
      const docSnap = await getDoc(doc(db, "posts", post.slug));

      let newView = 1;
      if (docSnap.exists()) {
        newView = (docSnap.data()?.views || 0) + 1;
      }

      setViewAdded(true);
      setPost({ ...post, views: newView });
      await setDoc(docSnap.ref, {
        views: newView,
      });
    };
    if (post && !viewAdded) {
      loadPost();
    }
  }, [post, viewAdded]);

  if (!post) return null;

  return (
    <div className="mx-auto my-16 w-full max-w-screen-lg px-4">
      <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">
        {post.title}
      </h1>
      <div className="mb-4 inline-flex items-center gap-4 text-gray-600 dark:text-gray-400">
        <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        <span>{"·"}</span>
        <span className="inline-flex items-center gap-2">
          <MdVisibility />
          {post.views ? `${post.views.toLocaleString()} views` : "loading..."}
        </span>
      </div>
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
