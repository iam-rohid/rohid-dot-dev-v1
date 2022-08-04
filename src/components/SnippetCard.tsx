import { ISnippet } from "@src/models/snippet";
import Link from "next/link";
import React, { useMemo } from "react";
import Code from "./atoms/Code";

const SnippetCard = ({ snippet }: { snippet: ISnippet }) => {
  const code = useMemo(() => {
    const _code = snippet.files[0].code.code;
    const splits = _code.split("\n");
    return splits.slice(0, 7).join("\n") + "\n// Read More";
  }, [snippet]);

  const href = useMemo(() => `/snippets/${snippet.slug}`, [snippet]);
  return (
    <Link href={href}>
      <a className="block">
        <h2 className="mb-2 text-2xl font-bold">{snippet.title}</h2>
        {!!snippet.description && (
          <p className="mb-1 text-gray-600 line-clamp-2 dark:text-gray-300">
            {snippet.description}
          </p>
        )}

        <p className="mb-4 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
          Total {snippet.files.length.toLocaleString()} Files
        </p>

        <div className="prose prose-lg max-w-full overflow-hidden dark:prose-invert">
          <Code value={{ code, language: snippet.files[0].code.language }} />
        </div>
      </a>
    </Link>
  );
};

export default SnippetCard;
