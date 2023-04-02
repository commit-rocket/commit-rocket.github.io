import { RequiredKeys } from "@/types/utility";
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import React, { DetailedHTMLProps, ForwardedRef, LabelHTMLAttributes, forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";



export const style = cva("text-sm font-bold block text-start", {
  variants: {
    inset: {
      true: "ml-4",
      false: ""
    }
  },
  defaultVariants: {
    inset: true
  }
});

export type VariantProps = GetVariantProps<typeof style>;
export type TagProps = RequiredKeys<DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "htmlFor">;

export type LabelProps = VariantProps & TagProps;

const Label = forwardRef(({ className, inset, ...props }: LabelProps, ref: ForwardedRef<HTMLLabelElement>) => {

  const computedClassName = useMemo(
    () => twMerge(style({ inset }), className),
    [className, inset]
  );

  return (
    <label
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});

export default Label;