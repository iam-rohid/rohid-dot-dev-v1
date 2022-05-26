import path from "path";
import * as fs from "node:fs/promises";

export const getBlogs = async () => {
  const BLOG_DIR = path.join(process.cwd(), "pages/blog");
  const files = await fs.readdir(BLOG_DIR, {
    withFileTypes: true,
  });
  console.log({ files });
  return [
    {
      title: "First Blog",
      content: "This is the first blog",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};
