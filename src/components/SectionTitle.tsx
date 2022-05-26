import Link from "next/link";
import React, { ReactNode } from "react";
import { MdChevronRight } from "react-icons/md";

const SectionTitle = ({
  title,
  id,
  children,
  description,
  moreLink,
  className,
}: {
  title: string;
  id?: string;
  description?: string;
  children: ReactNode;
  moreLink?: {
    href: string;
    text: string;
  };
  className?: string;
}) => {
  return (
    <section id={id} className={className}>
      <div className="mb-6">
        <div className="flex items-center overflow-hidden">
          <h2 className="flex-1 truncate text-2xl font-bold text-gray-900 dark:text-gray-50">
            {title}
          </h2>
          {moreLink && (
            <Link href={moreLink.href}>
              <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                <span>{moreLink.text}</span>
                <MdChevronRight className="text-2xl" />
              </a>
            </Link>
          )}
        </div>
        {description && <p className="mt-2">{description}</p>}
      </div>
      {children}
    </section>
  );
};

export default SectionTitle;
