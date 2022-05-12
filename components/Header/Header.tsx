import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaPatreon,
  FaBars,
  FaMoon,
  FaSun,
  FaLaptop,
} from "react-icons/fa";
import {
  MdLightMode,
  MdDarkMode,
  MdComputer,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useColorScheme } from "../../contexts/ColorScheme";
import useMediaQuery from "../../hooks/useMediaQuery";

const menu = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
  },
  {
    id: "daily-logs",
    label: "Daily Logs",
    href: "/daily-logs",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
  },
  {
    id: "snippets",
    label: "Snippets",
    href: "/snippets",
  },
];

const socialLinks = [
  {
    id: "twitter",
    label: "Twitter",
    icon: <FaTwitter />,
    href: "https://twitter.com/rohidisdev",
  },
  {
    id: "githu",
    label: "Github",
    icon: <FaGithub />,
    href: "https://github.com/rohidisdev",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: <FaInstagram />,
    href: "https://instagram.com/rohidisdev",
  },
  {
    id: "patreon",
    label: "Patreon",
    icon: <FaPatreon />,
    href: "https://patreon.com/rohid",
  },
];

const Header = () => {
  const [showMenuOnMobile, setShowMenuOnMobile] = useState(false);
  const { colorScheme, toggleTheme } = useColorScheme();
  const { asPath } = useRouter();
  const activePath = useMemo(() => {
    const path = asPath.split("/")[1];
    return path === "" ? "home" : path;
  }, [asPath]);
  const isMobileDevice = useMediaQuery("(max-width: 768px)");

  const onMenuClick = useCallback(() => {
    if (isMobileDevice) {
      setShowMenuOnMobile(!showMenuOnMobile);
    } else {
      setShowMenuOnMobile(false);
    }
  }, [isMobileDevice, showMenuOnMobile]);

  useEffect(() => {
    if (!isMobileDevice && showMenuOnMobile) {
      setShowMenuOnMobile(false);
    }
  }, [isMobileDevice, showMenuOnMobile]);

  return (
    <header>
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <button
          aria-label="Toggle theme button for this page"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 md:hidden"
          title={`Toggle Theme (${colorScheme})`}
        >
          {showMenuOnMobile ? <MdClose /> : <MdMenu />}
        </button>
        <ul className="hidden h-full items-center md:flex">
          {menu.map(({ label, href, id }) => (
            <li key={id} className="h-full">
              <Link href={href}>
                <a
                  aria-label={`link to ${label} page`}
                  title={label}
                  className={classNames(
                    "flex h-full items-center justify-center px-4",
                    {
                      "text-gray-900 dark:text-gray-50": activePath === id,
                      "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50":
                        activePath !== id,
                    }
                  )}
                >
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <ul className="flex h-full items-center justify-end">
          {socialLinks.map(({ label, icon, href, id }) => (
            <li key={id} className="h-full">
              <Link href={href}>
                <a
                  aria-label={`link to ${label}`}
                  target="_blank"
                  className="flex h-full items-center justify-center px-3 text-xl text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
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
          className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
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
        <nav className="w-full p-4">
          <ul>
            {menu.map(({ label, href, id }) => (
              <li key={id} className="h-full py-0.5">
                <Link href={href}>
                  <a
                    aria-label={`link to ${label} page`}
                    title={label}
                    className={classNames(
                      "flex items-center rounded-md px-4 py-2.5",
                      {
                        "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-50":
                          activePath === id,
                        "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-50":
                          activePath !== id,
                      }
                    )}
                    onClick={() => setShowMenuOnMobile(false)}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
