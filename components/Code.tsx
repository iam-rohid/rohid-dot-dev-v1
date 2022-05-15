import Prism from "prismjs";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck, FaClipboard } from "react-icons/fa";

export type CodeProps = {
  children: React.ReactNode;
  className?: string;
  language?: string;
};

const Code = ({ children, className, language }: CodeProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = preRef.current?.textContent;
    if (text) {
      window.navigator.clipboard.writeText(text);
      setIsCopied(true);
    }
  }, [preRef, setIsCopied]);

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current, false);
    }
  }, [children, preRef]);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <div className="relative md:-mx-4">
      <pre
        ref={preRef}
        className={classNames(`language-${language}`, className)}
      >
        {children}
      </pre>
      <button
        className="absolute top-2 right-2 z-10 flex h-10 w-10 items-center justify-center rounded-md text-xl text-gray-300 hover:bg-gray-700 hover:text-gray-100"
        onClick={handleCopy}
      >
        {isCopied ? <FaCheck className="text-green-400" /> : <FaClipboard />}
      </button>
    </div>
  );
};

export default Code;
