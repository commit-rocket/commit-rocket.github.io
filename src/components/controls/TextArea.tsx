import { DetailedHTMLProps, ForwardedRef, forwardRef, TextareaHTMLAttributes, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

import { style, VariantProps as InputVariantProps } from "./Input";

export type TagProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
export type VariantProps = InputVariantProps;
export type TextAreaProps = TagProps & RequiredKeys<VariantProps, "color" | "variant">;

const TextArea = forwardRef((
  {
    className,
    color,
    variant,
    ...props
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color, variant }), className),
    [className, color, variant]
  );

  return (
    <textarea
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});

export default TextArea;