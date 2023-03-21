import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, forwardRef, useMemo } from "react";;
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

export const style = cva("flex items-center justify-center transition-colors shadow-sm px-3 py-2 gap-2 rounded-full", {
  variants: {
    color: {
      secondary: "bg-secondary hover:bg-secondary-light border-2 border-secondary-dark text-secondary-contrast"
    }
  }
});

export type VariantProps = GetVariantProps<typeof style>;

type ButtonProps = {

} & RequiredKeys<VariantProps, "color">
  & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = forwardRef(({ className, color, ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color }), className),
    [className, color]
  );

  return (
    <button ref={ref} className={computedClassName} {...props} />
  );
});

export default Button;