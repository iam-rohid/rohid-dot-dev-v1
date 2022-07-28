import { IMeta } from "./meta";

export type IPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  body: any;
  meta?: IMeta;
};
