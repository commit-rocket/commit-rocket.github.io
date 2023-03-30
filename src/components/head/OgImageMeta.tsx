import React from "react";
import toOpenGraph from "./utils/toOpenGraph";

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

export interface OgImageMetaProps extends OgImage {

}

const OgImageMeta = ({ url, path, securePath, secureUrl, ...props }: OgImageMetaProps) => {
  const computedUrl = path ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${path}` : url;
  const computedSecureUrl = computedUrl?.startsWith("https") ? computedUrl : securePath ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${securePath}` : secureUrl;

  return (
    <>
      {toOpenGraph({ prefix: "og:image", props })}
      {toOpenGraph({
        prefix: "og:image",
        props: {
          url: computedUrl,
          secureUrl: computedSecureUrl
        }
      })}
    </>
  );
};

export default OgImageMeta;