import React, { useMemo } from "react";
import InternalLink, { LinkProps as InternalLinkProps } from "next/link";
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

export const style = cva("transition-colors", {
  variants: {
    underline: {
      true: "underline",
      false: ""
    },
    color: {
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
} & RequiredKeys<VariantProps, "color">
  & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps>
  & InternalLinkProps
  & React.RefAttributes<HTMLAnchorElement>;

const Link = ({ className, color, underline, ...props }: LinkProps) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color, underline }), className),
    [className, color, underline]
  );

  return (
    <InternalLink className={computedClassName} {...props} />
  );
};

export default Link;