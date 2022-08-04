import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {
  MdLightMode,
  MdDarkMode,
  MdComputer,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useColorScheme } from "@src/contexts/ColorScheme";
import useMediaQuery from "@src/hooks/useMediaQuery";
import { LinkType } from "@src/types";
import getNavigationLinks, {
  defaultLinks,
} from "@src/utils/get-navigation-links";
import { socialLinks } from "@src/data/socialLinks";

const NavBar = () => {
  const [links, setLinks] = useState<LinkType[]>(defaultLinks);
  const [showMenuOnMobile, setShowMenuOnMobile] = useState(false);
  const { colorScheme, toggleTheme } = useColorScheme();
  const { asPath } = useRouter();
  const isMobileDevice = useMediaQuery("(max-width: 768px)");

  const onMenuClick = useCallback(() => {
    if (isMobileDevice) {
      setShowMenuOnMobile(!showMenuOnMobile);
    } else {
      setShowMenuOnMobile(false);
    }
  }, [isMobileDevice, showMenuOnMobile]);

  const fetchLinks = useCallback(async () => {
    const _links = await getNavigationLinks();
    setLinks(_links);
  }, []);

  useEffect(() => {
    if (!isMobileDevice && showMenuOnMobile) {
      setShowMenuOnMobile(false);
    }
  }, [isMobileDevice, showMenuOnMobile]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <header>
      <nav className="container mx-auto flex h-14 items-center justify-between gap-6 px-4 xl:max-w-5xl">
        <button
          aria-label="Toggle theme button for this page"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 md:hidden"
          title={`Toggle Theme (${colorScheme})`}
        >
          {showMenuOnMobile ? <MdClose /> : <MdMenu />}
        </button>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map(({ label, href }) => {
            const isActive = asPath === href;
            return (
              <li key={href}>
                <Link href={href}>
                  <a
                    aria-label={`link to ${label} page`}
                    title={label}
                    className={classNames("flex items-center justify-center", {
                      "text-gray-900 dark:text-gray-50": isActive,
                      "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50":
                        !isActive,
                    })}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex-1" />
        <ul className="flex items-center justify-end gap-2">
          {socialLinks.map(({ label, icon, href, id }) => (
            <li key={id} className="h-full">
              <Link href={href}>
                <a
                  aria-label={`link to ${label}`}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  title={label}
                >
                  {icon}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <button
          aria-label="Toggle theme button for this page"
          onClick={() => toggleTheme()}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          title={`Toggle Theme (${colorScheme})`}
        >
          {colorScheme === "light" ? (
            <MdLightMode />
          ) : colorScheme === "dark" ? (
            <MdDarkMode />
          ) : (
            <MdComputer />
          )}
        </button>
      </nav>
      {showMenuOnMobile && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/50"
            onClick={() => setShowMenuOnMobile(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 z-30 w-screen max-w-[320px] bg-white dark:bg-gray-900">
            <div className="flex h-14 items-center gap-4 px-4">
              <div className="flex-1"></div>
              <div>
                <button
                  aria-label="Toggle theme button for this page"
                  onClick={() => setShowMenuOnMobile(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  title={`Toggle Theme (${colorScheme})`}
                >
                  <MdClose />
                </button>
              </div>
            </div>
            <ul className="p-4">
              {links.map(({ label, href }) => {
                const isActive = asPath === href;
                return (
                  <li key={href} className="h-full py-0.5">
                    <Link href={href}>
                      <a
                        aria-label={`link to ${label} page`}
                        title={label}
                        className={classNames(
                          "flex items-center rounded-lg px-4 py-2.5",
                          {
                            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
                              isActive,
                            "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50":
                              !isActive,
                          }
                        )}
                        onClick={() => setShowMenuOnMobile(false)}
                      >
                        {label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </>
      )}
    </header>
  );
};

export default NavBar;
