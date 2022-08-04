import { socialLinks } from "@src/data/socialLinks";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto w-full space-y-8 py-16 px-4 xl:max-w-5xl">
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
      </div>
      <div className="py-8 text-center text-gray-600 dark:text-gray-400">
        © 2022 rohid.dev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
