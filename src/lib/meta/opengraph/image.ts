import toOpenGraph from "./toOpenGraph";

export interface OgImage {
  url?: string;
  secureUrl?: string;
  path?: string;
  securePath?: string;
  type?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export const makeImageOgMeta = ({ url, path, securePath, secureUrl, ...props }: OgImage) => {
  const computedUrl = path ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${path}` : url;
  const computedSecureUrl = computedUrl?.startsWith("https") ? computedUrl : securePath ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${securePath}` : secureUrl;

  return [
    toOpenGraph({ prefix: "og:image", props }),
    toOpenGraph({ prefix: "og:image", props: { url: computedUrl, secureUrl: computedSecureUrl } })
  ].flat();
};
