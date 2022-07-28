import { PortableTextBlockComponent } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { IMeta } from "@src/models";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  body: PortableTextBlockComponent;
  meta?: IMeta;
};

export type Project = {
  title: string;
  slug: string;
  visitUrl?: string;
  repositoryUrl?: string;
  images: SanityImageSource[];
  publishedAt: string;
  meta?: IMeta;
};

export type Tag = {
  slug: string;
  title: string;
  description?: string;
};
