import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import React, { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export const style = cva("pl-5 flex flex-col", {
  variants: {
    numbered: {
      true: "list-decimal",
      false: "list-disc"
    }
  },
  defaultVariants: {
    numbered: false
  }
});

export type TagProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement | HTMLOListElement>, HTMLUListElement | HTMLOListElement>;
export type VariantProps = GetVariantProps<typeof style>;
export type BaseProps = {};

export type ListProps = BaseProps & TagProps & VariantProps;

const List = forwardRef((
  { numbered, className, ...props }: Omit<ListProps, "ref">,
  ref: ForwardedRef<HTMLUListElement | HTMLOListElement>
) => {

  const ListTag = numbered ? "ol" : "ul";

  const computedClassName = useMemo(
    () => twMerge(style({ numbered }), className),
    [className]
  );

  return (
    <ListTag
      //@ts-ignore
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});


const children = {
  Item: forwardRef((props: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>, ref: ForwardedRef<HTMLLIElement>) => {
    return <li ref={ref} {...props} />;
  })
};

export type IArticleList = typeof List & typeof children;

export default Object.assign({}, List, children) as IArticleList;