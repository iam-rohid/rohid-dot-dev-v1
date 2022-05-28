import { posts } from "@src/data";
import { Post } from "@src/types";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "./firebase";

export const getAllPosts = async (): Promise<Post[]> => {
  const db = getFirestore(firebaseApp);
  const postCollection = collection(db, "posts");
  const { docs } = await getDocs(postCollection);

  return posts
    .filter((post) => !post.isPrivate)
    .sort((a, b) => {
      const aDate = Date.parse(a.createdAt);
      const bDate = Date.parse(b.createdAt);
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    })
    .map((post) => {
      const _doc = docs?.find((doc) => doc.id === post.slug);
      return {
        ...post,
        views: _doc?.data()?.views || 0,
      } as Post;
    });
};
