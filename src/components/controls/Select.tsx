import { ForwardedRef, forwardRef, ReactNode, useMemo } from "react";
import { Listbox } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { Control, Controller, FieldPath, FieldValues, PathValue, UseControllerProps } from "react-hook-form";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { style as inputStyle, VariantProps as InputVariantProps } from "./Input";
import { mergeRefs } from "@/utils/react";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";

export const style = inputStyle;
export type VariantProps = InputVariantProps;

export const containerStyle = cva("absolute border-2  bg-white left-1/2 -translate-x-1/2 top-full rounded-lg min-w-fit w-full overflow-hidden translate-y-1 z-50", {
  variants: {
    color: {
      primary: "border-primary",
      secondary: "border-secondary"
    }
  }
});
export const itemStyle = cva("px-4 py-2", {
  variants: {
    color: {
      primary: "ui-active:bg-primary/20",
      secondary: "ui-active:bg-secondary/20"
    }
  }
});

export type BaseProps<TOption extends any, TOptions extends readonly TOption[] = readonly TOption[]> = {
  id?: string;
  name?: string;
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  value: TOption;
  getDisplayName: (option: TOption) => ReactNode;
  options: TOptions;
  onChange: (option: TOption) => void;
  onBlur?: () => void;
};

export type SelectProps<TOption extends any> = BaseProps<TOption> & VariantProps;

const optionsAnim = {
  in: {
    height: 0,
    paddingBlock: 0,
  },
  anim: {
    height: "auto",
    paddingBlock: "0.5rem",
    transition: {
      duration: 0.15
    }
  },
  exit: {
    height: 0,
    paddingBlock: 0,
    transition: {
      duration: 0.15
    }
  }
} as Variants;

const Select = forwardRef(<TOption extends any>(
  {
    id,
    name,
    className,
    containerClassName,
    itemClassName,
    value,
    color,
    options,
    getDisplayName,
    onChange,
    onBlur
  }: SelectProps<TOption>,
  ref: ForwardedRef<HTMLButtonElement>
) => {

  const computedClassName = useMemo(() => twMerge(
    "relative flex items-center",
    style({ color }),
    className
  ), [color, className]);

  const computedContainerClassName = useMemo(() => twMerge(
    containerStyle({ color }),
    containerClassName
  ), [color, containerClassName]);

  const computedItemClassName = useMemo(() => twMerge(
    itemStyle({ color }),
    itemClassName
  ), [color, itemClassName]);

  return (

    <Listbox name={name} value={value} onChange={onChange}>
      <Listbox.Button
        id={id}
        ref={ref}
        onBlur={onBlur}
        className={computedClassName}
      >
        {({ open }) => (
          <>
            {getDisplayName(value)}
            <ChevronDownIcon
              className="inline w-4 h-4 ml-2 motion-safe:transition-transform ui-open:rotate-180"
              width="1em"
              height="1em"
            />
            <AnimatePresence>
              {open && <motion.div
                key="options"
                className={computedContainerClassName}
                variants={optionsAnim}
                initial="in"
                animate="anim"
                exit="exit"
              >
                <Listbox.Options static>
                  {options.map((option, i) => (
                    <Listbox.Option key={i} value={option} className={computedItemClassName}>
                      {getDisplayName(option)}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </motion.div>}
            </AnimatePresence>
          </>
        )}
      </Listbox.Button>
    </Listbox>
  );
});

export type ControlledSelectProps<Values extends FieldValues, TOption extends any, Name extends FieldPath<Values> = FieldPath<Values>> = {
  name: Name,
  defaultValue?: PathValue<Values, Name>;
  control: Control<Values>;
}
  & Omit<SelectProps<TOption>, "value" | "onChange">
  & Pick<UseControllerProps<Values>, "rules" | "shouldUnregister">;;

export const ControlledSelect = forwardRef(<Values extends FieldValues, TOption extends any>(
  {
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    ...props
  }: ControlledSelectProps<Values, TOption>,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    shouldUnregister={shouldUnregister}
    render={({ field: { ref: controllerRef, value, ...controlledProps } }) => (
      <Select
        ref={mergeRefs(ref, controllerRef)}
        value={value}
        {...props}
        {...controlledProps}
      />
    )}
  />
));


export default Select;