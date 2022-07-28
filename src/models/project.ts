import { IMeta } from "./meta";

export type IProject = {
  title: string;
  slug: string;
  visitUrl?: string;
  repositoryUrl?: string;
  images: any[];
  publishedAt: string;
  meta?: IMeta;
  body: any;
};
