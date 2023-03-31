import { DetailedHTMLProps, ForwardedRef, forwardRef, TextareaHTMLAttributes, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

import { style as inputStyle, VariantProps as InputVariantProps } from "./Input";

export const style: typeof inputStyle = (props) => twMerge(inputStyle(props), "rounded-lg");

export type TagProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
export type VariantProps = InputVariantProps;
export type TextAreaProps = TagProps & RequiredKeys<VariantProps, "color">;

const TextArea = forwardRef((
  {
    className,
    color,
    ...props
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color }), className),
    [className, color]
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