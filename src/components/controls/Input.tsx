import { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode, useId, useMemo } from "react";
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";

import Label, { style as labelStyle } from "./Label";

export const style = cva("w-full rounded-full py-2 px-3 border-2", {
  variants: {
    color: {
      primary: "border-primary bg-white",
      secondary: "border-secondary bg-white"
    },
  },
  defaultVariants: {
    color: "primary"
  }
});

const borderStyle = cva("absolute inset-0 border-2 top-[-9px] rounded-[inherit] pl-[var(--label-inset)] pointer-events-none", {
  variants: {
    color: {
      primary: "border-primary",
      secondary: "border-secondary"
    },
  }
});

export type BaseProps = {
  inputClassName?: string;
  labelClassName?: string;
  fieldsetClassName?: string;
  labelInset?: string;
  label?: ReactNode;
};

export type TagProps = Omit<InputHTMLAttributes<HTMLInputElement>, "color">;
export type VariantProps = GetVariantProps<typeof style>;
export type InputProps = BaseProps & TagProps & RequiredKeys<VariantProps, "color">;

const Input = forwardRef((
  {
    className,
    inputClassName,
    labelClassName,
    fieldsetClassName,
    labelInset = "1.5rem",
    label,
    color,
    id,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {

  const fallbackId = useId();

  const computedClassName = useMemo(
    () => twMerge("relative rounded-full", className),
    [className]
  );

  const computedInputClassName = useMemo(
    () => twMerge(
      style({ color }),
      "rounded-[inherit]",
      label ? "border-transparent" : "",
      inputClassName
    ),
    [inputClassName, color, label]
  );

  const computedLabelClassName = useMemo(
    () => twMerge("absolute left-[var(--label-inset)] top-0 translate-x-[2px] -translate-y-1/2 px-1", labelClassName),
    [labelClassName]
  );

  const computedFieldsetClassName = useMemo(
    () => twMerge(borderStyle({ color }), fieldsetClassName),
    [color, fieldsetClassName]
  );

  const computedLegendClassName = useMemo(
    () => twMerge(labelStyle(), "px-1 opacity-0"),
    [computedLabelClassName]
  );

  const insetProps = useMemo<Record<string, string>>(
    () => ({ "--label-inset": labelInset }),
    [labelInset]
  );

  return (
    <div className={computedClassName}>
      {label && <Label className={computedLabelClassName} htmlFor={id ?? fallbackId} style={insetProps}>
        {label}
      </Label>}
      {label && <fieldset aria-hidden className={computedFieldsetClassName} style={insetProps}>
        <legend className={computedLegendClassName}>{label}</legend>
      </fieldset>}
      <input
        ref={ref}
        className={computedInputClassName}
        id={id ?? fallbackId}
        {...props}
      />
    </div>
  );
});

export default Input;