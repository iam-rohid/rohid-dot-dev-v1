export const importAll = (r: any) => {
  return r
    .keys()
    .filter((filename: string) => filename.startsWith("."))
    .map((fileName: string) => ({
      slug: fileName.substr(2).replace(/\/index\.mdx$/, ""),
      module: r(fileName),
    }));
};
