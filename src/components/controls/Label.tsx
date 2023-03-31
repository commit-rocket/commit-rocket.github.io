import React, { DetailedHTMLProps, ForwardedRef, LabelHTMLAttributes, forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  htmlFor: string;
}

const Label = forwardRef(({ className, ...props }: LabelProps, ref: ForwardedRef<HTMLLabelElement>) => {

  const computedClassName = useMemo(
    () => twMerge("text-sm font-bold block", className),
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