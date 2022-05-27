import Link from "next/link";
import React from "react";
import { FaTwitter, FaGithub, FaInstagram, FaPatreon } from "react-icons/fa";

const socialLinks = [
  {
    id: "twitter",
    label: "Twitter",
    icon: <FaTwitter />,
    href: "https://twitter.com/rohid_dev",
  },
  {
    id: "githu",
    label: "Github",
    icon: <FaGithub />,
    href: "https://github.com/rohid-dev",
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

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto w-full max-w-4xl space-y-8 py-8 px-4">
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-5">
          <div className="col-span-3 lg:col-span-2">
            <h3 className="mb-2 text-3xl font-medium">
              You reached the end 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Thank you for visiting. I&apos;m available for freelance work. If
              you have any questions, feel free to reach out to me. I&apos;ll
              respond as soon as possible.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Links</h3>
            <ul className="space-y-2">
              {[
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
              ].map(({ label, id, href }) => (
                <li key={id}>
                  <Link href={href}>
                    <a className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Social</h3>
            <ul className="space-y-2">
              {socialLinks.map(({ label, id, icon, href }) => (
                <li key={id}>
                  <Link href={href}>
                    <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                      {icon}
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Legal</h3>
            <ul className="space-y-2">
              {[
                {
                  id: "terms-of-service",
                  label: "Terms of Service",
                  href: "/contact",
                },
                {
                  id: "privacy-policy",
                  label: "Privacy Policy",
                  href: "/contact",
                },
              ].map(({ label, id, href }) => (
                <li key={id}>
                  <Link href={href}>
                    <a className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-gray-600 dark:text-gray-300 md:flex-row md:gap-8">
          © 2022 rohid.dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
