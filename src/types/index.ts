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
  views?: number;
};

export type Project = {
  slug: string;
  name: string;
  description?: string;
  tags: string[];
  isFeatured?: boolean;
  url?: string;
  repo?: string;
  images: (string | StaticImageData)[];
  date: string;
};

export type Tag = {
  slug: string;
  name: string;
  isFeatured?: boolean;
};
