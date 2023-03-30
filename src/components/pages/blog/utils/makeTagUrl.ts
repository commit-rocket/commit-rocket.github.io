const makeTagUrl = (tag: string) => {
  const url = new URL("/blog", "https://example.com");
  url.searchParams.set("tag", tag);
  return url.href.replace(url.origin, "");
};

export default makeTagUrl;