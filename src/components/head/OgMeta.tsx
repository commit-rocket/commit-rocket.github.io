import { useRouter } from "next/router";
import toOpenGraph from "./utils/toOpenGraph";


export interface OgBase {
  title: string;
  siteName?: string;
  description?: string;
  url: string;
  path?: string;
  type: "article" | "profile" | "website";
  image?: string;

  locale?: string;
  localeAlternate?: string | string[];

  audio?: string;
  video?: string;
}

export interface OgMetaProps extends Partial<OgBase> {

}

const DEFAULT_OG = {
  title: "Commit Rocket",
  description: "Commit Rocket, the next-gen git client",
  url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  type: "website",
  locale: "en_US"
} as OgBase;

const OgMeta = ({ localeAlternate, path, url, image, ...props }: OgMetaProps = DEFAULT_OG) => {
  const computedUrl = path ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${path}` : url;
  const computedImage = !image ? undefined : image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_FRONTEND_URL}${image}`;

  return (
    <>
      {props.title && <title>{props.title}</title>}
      {props.description && <meta name="description" content={props.description} />}
      {toOpenGraph({ props, prefix: "og" })}
      {toOpenGraph({ props: { url: computedUrl, image: computedImage }, prefix: "og" })}
      {toOpenGraph({ props: { localeAlternate }, prefix: "og:locale" })}
    </>
  );
};

export default OgMeta;