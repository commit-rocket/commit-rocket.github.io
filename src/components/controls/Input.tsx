import { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode, useId, useMemo } from "react";
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

export const style = cva("w-full rounded-2xl py-2 px-3 border-2", {
  variants: {
    color: {
      primary: "border-primary bg-transparent placeholder:text-fill-contrast/75",
      secondary: "border-secondary bg-transparent placeholder:text-fill-contrast/75"
    },
  },
  defaultVariants: {
    color: "primary"
  }
});

export type TagProps = Omit<InputHTMLAttributes<HTMLInputElement>, "color">;
export type VariantProps = GetVariantProps<typeof style>;
export type InputProps = TagProps & RequiredKeys<VariantProps, "color">;

const Input = forwardRef((
  {
    className,
    color,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {

  const computedClassName = useMemo(() => {
    return twMerge(style({ color }), className);
  }, [className, color]);

  return (
    <input
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});

export default Input;