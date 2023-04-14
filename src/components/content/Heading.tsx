import React, { ForwardedRef, forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export const makeHeading = (level: number, defaultClassName: string) => forwardRef((
  {
    className,
    ...props
  }: HeadingProps,
  ref: ForwardedRef<HTMLHeadingElement>
) => {
  const Tag = `h${level}`;

  const computedClassName = useMemo(
    () => twMerge(defaultClassName, className),
    [className]
  );

  return <Tag
    ref={ref}
    //@ts-ignore
    className={computedClassName}
    {...props}
  />;
});

export const H1 = makeHeading(1, "text-5xl font-bold md:text-6xl");
export const H2 = makeHeading(2, "text-4xl font-bold md:text-5xl");
export const H3 = makeHeading(3, "text-3xl font-semibold md:text-4xl");
export const H4 = makeHeading(4, "text-2xl font-semibold md:text-3xl");
export const H5 = makeHeading(5, "text-xl font-semibold md:text-2xl");
export const H6 = makeHeading(6, "text-lg font-semibold md:text-xl");

export default {
  /** Styled `h1` */
  H1,

  /** Styled `h2` */
  H2,

  /** Styled `h3` */
  H3,

  /** Styled `h4` */
  H4,

  /** Styled `h5` */
  H5,

  /** Styled `h6` */
  H6
};