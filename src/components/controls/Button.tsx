import { HTMLAttributes, useMemo } from "react";;
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

export const style = cva("flex items-center justify-center transition-colors shadow-sm px-3 py-2 rounded-md", {
  variants: {
    color: {
      secondary: "bg-secondary hover:bg-secondary-dark text-secondary-contrast"
    }
  }
});

export type VariantProps = GetVariantProps<typeof style>;

type ButtonProps = {

} & RequiredKeys<VariantProps, "color">
  & HTMLAttributes<HTMLButtonElement>;

const Button = ({ className, color, ...props }: ButtonProps) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color }), className),
    [className, color]
  );

  return (
    <button className={computedClassName} {...props} />
  );
};

export default Button;