import { sanityClient } from "@src/lib/sanityClient";
import { LinkType } from "@src/types";

export const defaultLinks: LinkType[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Snippets",
    href: "/snippets",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default async function getNavigationLinks(): Promise<LinkType[]> {
  return [...defaultLinks];
}
