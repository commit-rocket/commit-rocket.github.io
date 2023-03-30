import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, forwardRef, useMemo } from "react";;
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import fadeAnim from "@/animations/fade";

export const style = cva("relative flex items-center justify-center transition-colors shadow-sm px-3 py-2 gap-2 rounded-full border-2", {
  variants: {
    color: {
      white: "bg-neutral-200 hover:bg-neutral-50 border-neutral-400 text-neutral-900",
      primary: "bg-primary hover:bg-primary-light border-primary-dark text-primary-contrast",
      secondary: "bg-secondary hover:bg-secondary-light border-secondary-dark text-secondary-contrast"
    }
  }
});

export type BaseProps = {
  loading?: boolean;
};

export type VariantProps = GetVariantProps<typeof style>;

type ButtonProps = {

} & BaseProps
  & RequiredKeys<VariantProps, "color">
  & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = forwardRef(({ className, color, loading, children, disabled, ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {

  const computedClassName = useMemo(
    () => twMerge(style({ color }), className),
    [className, color]
  );

  return (
    <button ref={ref} className={computedClassName} disabled={loading || disabled} {...props}>
      {!loading && children}
      <AnimatePresence mode="wait">
        {loading && <motion.span
          key="placeholder"
          className="invisible"
          variants={fadeAnim}
          initial="in"
          animate="anim"
          exit="exit"
          aria-hidden
        >
          {children}
        </motion.span>}
        {loading && <motion.span
          key="loading-icon"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          variants={fadeAnim}
          initial="in"
          animate="anim"
          exit="exit"
        >
          <ArrowPathIcon className="w-[1em] h-[1em] animate-spin" />
        </motion.span>}
      </AnimatePresence>
    </button>
  );
});

export default Button;