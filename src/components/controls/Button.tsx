import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, forwardRef, useMemo } from "react";;
import { cva, VariantProps as GetVariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { RequiredKeys } from "@/types/utility";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import fadeAnim from "@/animations/fade";

export const style = cva("relative flex items-center justify-center transition-colors shadow-sm px-3 py-2 gap-2 rounded-2xl", {
  variants: {
    color: {
      white: "bg-neutral-200 hover:bg-neutral-50 text-neutral-900",
      primary: "bg-cr-primary hover:bg-cr-primary-light bord text-cr-primary-contrast"
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
      <AnimatePresence>
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
          <ArrowPathIcon
            className="w-[1em] h-[1em] animate-spin"
            width="1em"
            height="1em"
          />
        </motion.span>}
      </AnimatePresence>
    </button>
  );
});

export default Button;