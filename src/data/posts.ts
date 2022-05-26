import { Post } from "@src/types";

export const posts: Post[] = [
  {
    isPrivate: false,
    isFeatured: true,
    isPopular: false,
    slug: "configure-nextjs-with-typescript-and-tailwindcss",
    title: "Configure Next.js with TypeScript and Tailwindcss",
    description:
      "Let's create a next.js Project with TypeScript and Tailwindcss from scratch! In this blog post we are going to see how we can create the next.js project with",
    createdAt: "2022-03-10",
    updatedAt: "2022-03-10",
    tags: ["next-js", "typescript", "tailwind-css"],
  },
  {
    isPrivate: false,
    isFeatured: true,
    isPopular: true,
    slug: "react-tailwindcss-typescript-vite-starter-template",
    title: "React Tailwindcss TypeScript Vite Starter Template",
    description:
      "This is a starter template for React + Tailwindcss + TypeScript + Vite.",
    createdAt: "2022-03-10",
    updatedAt: "2022-03-10",
    tags: ["react", "tailwind-css", "typescript"],
  },
  {
    isPrivate: false,
    isFeatured: true,
    isPopular: true,
    slug: "top-10-vscode-extensions-for-react-and-next-js",
    title: "Top 10 VSCode Extensions for React and Next.js",
    description:
      " We will be covering 10 essential visual studio code extensions for React developers. These extensions will help you code faster cleaner and easier.",
    createdAt: "2022-03-12",
    updatedAt: "2022-03-12",
    tags: ["react", "next-js", "vs-code"],
  },
];
