import { sanityClient } from "@src/lib/sanityClient";
import { LinkType } from "@src/types";

export default async function getNavigationLinks(): Promise<LinkType[]> {
  const { menuCategories } = await sanityClient.fetch(
    `*[_type == "siteSettings" && _id == $docId][0]{
    menuCategories[]-> {
      "slug": slug.current,
      title
    }
  }`,
    {
      docId: process.env.NEXT_PUBLIC_SITE_SETTINGS_DOC_ID || "site-settings",
    }
  );

  return [
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
    ...menuCategories.map((category) => ({
      label: category.title,
      href: `/category/${category.slug}`,
    })),
  ];
}
