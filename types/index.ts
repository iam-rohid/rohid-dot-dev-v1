export type Blog = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  isFeatured: boolean;
};

export type Tag = {
  slug: string;
  name: string;
  isFeatured: boolean;
};
