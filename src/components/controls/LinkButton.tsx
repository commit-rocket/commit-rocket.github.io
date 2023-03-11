import React, { useMemo } from "react";
import Link, { LinkProps as InternalLinkProps } from "next/link";
import { VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

import { style as buttonStyle } from "./Button";

export const style = buttonStyle;

export type VariantProps = GetVariantProps<typeof style>;

type LinkButtonProps = {

} & RequiredKeys<VariantProps, "color">
  & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps>
  & InternalLinkProps
  & React.RefAttributes<HTMLAnchorElement>;

const LinkButton = ({ className, color, ...props }: LinkButtonProps) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color }), className),
    [className, color]
  );

  return (
    <Link className={computedClassName} {...props} />
  );
};

export default LinkButton;