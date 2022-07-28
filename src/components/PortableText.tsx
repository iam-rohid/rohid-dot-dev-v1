import React, { useMemo } from "react";
import {
  PortableText as SanityPortableText,
  PortableTextReactComponents,
} from "@portabletext/react";
import Code from "./atoms/Code";
import getSlug from "@src/utils/getSlug";
import Link from "next/link";
import Image from "next/image";
import imageUrl from "@src/lib/imageUrl";

const components: Partial<PortableTextReactComponents> = {
  types: {
    code: Code,
    image: ({ value }) => (
      <Image
        src={value.image.url}
        alt={`Image`}
        layout="responsive"
        width={value.image.metadata.dimensions.width}
        height={value.image.metadata.dimensions.height}
      />
    ),
  },
  block: {
    h1: ({ value, children }) => {
      const id = getSlug(value.children[0].text);
      return (
        <h1 id={id}>
          <Link href={`#${id}`}>
            <a className="no-underline">{children}</a>
          </Link>
        </h1>
      );
    },
    h2: ({ value, children }) => {
      const id = getSlug(value.children[0].text);
      return (
        <h2 id={id}>
          <Link href={`#${id}`}>
            <a className="no-underline">{children}</a>
          </Link>
        </h2>
      );
    },
    h3: ({ value, children }) => {
      const id = getSlug(value.children[0].text);
      return (
        <h3 id={id}>
          <Link href={`#${id}`}>
            <a className="no-underline">{children}</a>
          </Link>
        </h3>
      );
    },
  },
};

export type PortableTextProps = {
  value: any;
};

const PortableText = (props: PortableTextProps) => {
  const { value } = props;
  return (
    <div className="prose min-w-0 max-w-full dark:prose-invert lg:prose-lg">
      <SanityPortableText value={value} components={components} />
    </div>
  );
};

export default PortableText;
