import { StaticImageData } from "next/image";

export type Post = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPrivate?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  isFeatured?: boolean;
  url?: string;
  repo?: string;
  images: (string | StaticImageData)[];
};

export type Tag = {
  slug: string;
  name: string;
  isFeatured?: boolean;
};
