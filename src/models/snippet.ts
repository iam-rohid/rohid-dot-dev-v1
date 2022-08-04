import { IMeta } from "./meta";

export interface ISnippet {
  slug: string;
  title: string;
  description?: string;
  files: {
    _key: string;
    code: Code;
    fileName: string;
  }[];
  meta?: IMeta;
  publishedAt: string;
}

export interface Code {
  code: string;
  language: string;
}
