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
  url: string;
  coverPhoto: string;
};

export type Tag = {
  slug: string;
  name: string;
  isFeatured?: boolean;
};
