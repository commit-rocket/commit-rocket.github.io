import { cva } from "class-variance-authority";
import React, { DetailedHTMLProps, ForwardedRef, LabelHTMLAttributes, forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  htmlFor: string;
}

export const style = cva("text-sm font-bold block");

const Label = forwardRef(({ className, ...props }: LabelProps, ref: ForwardedRef<HTMLLabelElement>) => {

  const computedClassName = useMemo(
    () => twMerge(style(), className),
    [className]
  );

  return (
    <label
      className={computedClassName}
      {...props}
    />
  );
});

export default Label;