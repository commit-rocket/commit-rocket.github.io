import { ForwardedRef, forwardRef, InputHTMLAttributes, useMemo } from "react";
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

export const style = cva("rounded-full py-2 px-3", {
  variants: {
    variant: {
      outlined: "border-2"
    },
    color: {
      primary: "",
      secondary: ""
    },
  },
  compoundVariants: [
    {
      className: "border-primary bg-white",
      color: "primary",
      variant: "outlined"
    },
    {
      className: "border-secondary bg-white",
      color: "secondary",
      variant: "outlined"
    }
  ],
  defaultVariants: {
    color: "primary",
    variant: "outlined"
  }
});

export type TagProps = Omit<InputHTMLAttributes<HTMLInputElement>, "color">;
export type VariantProps = GetVariantProps<typeof style>;
export type InputProps = TagProps & RequiredKeys<VariantProps, "color" | "variant">;

const Input = forwardRef((
  {
    className,
    color,
    variant,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color, variant }), className),
    [className, color, variant]
  );

  return (
    <input
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});

export default Input;