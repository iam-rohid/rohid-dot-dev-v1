import { Project } from "@src/types";
import banner from "./images/banner.png";
import screenshot02 from "./images/screenshot-02.png";
import screenshot03 from "./images/screenshot-03.png";
import screenshot04 from "./images/screenshot-04.png";

export default {
  slug: "code-to-img",
  name: "CodeToImg - Convert code snippets to beautiful images.",
  description:
    "Code to Image converter is a beautifully designed application that helps you generate beautiful and customizable images of your code snippets. If you want to share your code with anyone or on any social media this is the application you need.",
  url: "https://codetoimg.com",
  repo: "https://github.com/rohid-dev/code-to-img",
  images: [banner, screenshot02, screenshot03, screenshot04],
  tags: ["web-app", "react", "next-js"],
  isFeatured: true,
} as Project;
