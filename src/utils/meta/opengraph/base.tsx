import { StaticImageData } from "next/image";
import toOpenGraph from "./toOpenGraph";
import { OgImage } from "./image";

export interface OgBase {
  title: string;
  siteName?: string;
  description?: string;
  url: string;
  pathname?: string;
  type: "article" | "profile" | "website";

  image?: string | StaticImageData;
  imageAlt?: string;

  locale?: string;
  localeAlternate?: string | string[];

  audio?: string;
  video?: string;
}

const DEFAULT_OG = {
  title: "Commit Rocket",
  description: "Commit Rocket, the next-gen git client",
  url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  type: "website",
  siteName: "Commit Rocket",
  locale: "en_US"
} satisfies OgBase;

const computeImage = (image?: string | StaticImageData, imageAlt?: string) => {
  if (!image) return {};
  if (typeof image === "string") return {
    url: image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_FRONTEND_URL}${image}`
  };

  return {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${image.src}`,
    type: `image/${image.src.split(".").at(-1)!}`,
    width: image.width,
    height: image.height,
    alt: imageAlt
  } satisfies OgImage;
};

export const makeOgMeta = ({ reverseTitle, ...allProps }: Partial<OgBase> & { reverseTitle?: boolean; }) => {
  const { localeAlternate, pathname, url, image, title, ...props } = Object.assign({}, DEFAULT_OG, allProps);

  const firstTitlePart = reverseTitle ? DEFAULT_OG.title : title;
  const secondTitlePart = reverseTitle ? title : DEFAULT_OG.title;

  const computedTitle = title === DEFAULT_OG.title ? title : `${firstTitlePart} - ${secondTitlePart}`;
  const computedUrl = pathname ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${pathname}` : url;
  const computedImage = computeImage(image);

  return [
    title && <title key="title">{computedTitle}</title>,
    props.description && <meta key="description" name="description" content={props.description} />,
    computedUrl && <link key="canonical" rel="canonical" href={computedUrl} />,

    toOpenGraph({ props, prefix: "og" }),
    toOpenGraph({ props: { url: computedUrl, image: computedImage.url, title: computedTitle }, prefix: "og" }),
    toOpenGraph({ props: computedImage, prefix: "og:image" }),
    toOpenGraph({ props: { localeAlternate }, prefix: "og:locale" })
  ].flat();
};