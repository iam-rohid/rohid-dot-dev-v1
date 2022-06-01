import { Project } from "@src/types";
import banner from "./images/banner.png";
import screenshot02 from "./images/screenshot-02.png";
import screenshot03 from "./images/screenshot-03.png";
import screenshot04 from "./images/screenshot-04.png";

const meta: Project = {
  slug: "code-to-img",
  name: "CodeToImg - Convert code snippets to beautiful images.",
  url: "https://codetoimg.com",
  repo: "https://github.com/rohid-dev/code-to-img",
  images: [banner, screenshot02, screenshot03, screenshot04],
  tags: ["web-app", "react", "next-js"],
  isFeatured: true,
  date: "2022-05-28",
};

export default meta;
