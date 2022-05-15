import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";

export type AppLinkType = {
  children?: ReactNode;
  className?: string;
} & LinkProps;

const AppLink = ({ children, className, ...rest }: AppLinkType) => {
  return (
    <Link {...rest}>
      <a>{children}</a>
    </Link>
  );
};

export default AppLink;
