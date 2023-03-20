import React, { useMemo } from "react";
import InternalLink, { LinkProps as InternalLinkProps } from "next/link";
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";

import { RequiredKeys } from "@/types/utility";

export const style = cva("transition-colors gap-2", {
  variants: {
    underline: {
      true: "underline",
      false: ""
    },
    color: {
      white: "text-white hover:text-neutral-300",
      primary: "text-primary hover:text-primary-light",
      secondary: "text-secondary hover:text-secondary-light"
    }
  },
  defaultVariants: {
    underline: false
  }
});

export type VariantProps = GetVariantProps<typeof style>;

type LinkProps = {
  underline?: boolean;
  external?: boolean;
} & RequiredKeys<VariantProps, "color">
  & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps>
  & InternalLinkProps
  & React.RefAttributes<HTMLAnchorElement>;

const Link = ({ className, color, underline, children, external, hrefLang = "en", rel, ...props }: LinkProps) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color, underline }), className),
    [className, color, underline]
  );

  return (
    <InternalLink
      className={computedClassName}
      hrefLang={hrefLang}
      rel={`${external ? "external" : ""} ${rel}`}
      target={external ? "_blank" : undefined}
      {...props}
    >
      {children}
      {external && <ArrowTopRightOnSquareIcon
        className="inline w-4 h-4"
      />}
    </InternalLink>
  );
};

export default Link;