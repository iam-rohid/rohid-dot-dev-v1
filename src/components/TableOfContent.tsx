import getSlug from "@src/utils/getSlug";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

const TableOfContent = (props: { value: any }) => {
  const { value } = props;
  const blocks = useMemo(() => {
    return value.filter(
      (item) =>
        item._type === "block" && ["h1", "h2", "h3"].includes(item.style)
    );
  }, [value]);

  if (blocks.length === 0) return null;

  return (
    <div className="py-16">
      <p className="mb-4 text-lg font-medium">In this article</p>
      <ul>
        {blocks.map((block) => (
          <Item key={block._key} item={block} />
        ))}
      </ul>
    </div>
  );
};

export default TableOfContent;

const Item = ({ item }: { item: any }) => {
  const text = item.children[0].text;
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setId(getSlug(text));
  }, [text]);

  useEffect(() => {
    const startIndex = router.asPath.indexOf("#");
    const currentId = router.asPath.slice(startIndex + 1, router.asPath.length);
    setIsActive(currentId === id);
  }, [router, id]);

  return (
    <li key={item._key}>
      <Link href={`#${id}`}>
        <a
          className={classNames("block border-l py-1 pl-4", {
            "border-gray-100 text-gray-600 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-50":
              !isActive,
            "border-gray-900 dark:border-gray-50": isActive,
          })}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};
