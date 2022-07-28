import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { IMeta } from "./meta";

export type IProject = {
  title: string;
  slug: string;
  visitUrl?: string;
  repositoryUrl?: string;
  images: SanityImageSource[];
  publishedAt: string;
  meta?: IMeta;
};
