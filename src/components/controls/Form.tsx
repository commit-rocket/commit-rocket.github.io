import { ReactNode } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

const fadeAnim = {
  in: {
    opacity: 0
  },
  anim: {
    opacity: 1,
    transition: {
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.35
    }
  }
} as const;

export interface FormProps extends HTMLMotionProps<"form"> {
  children: ReactNode;
  oneTime?: boolean;
  success?: boolean;
  successClassName?: string;
  successChildren?: ReactNode;
  successProps?: HTMLMotionProps<"div">;
}

const Form = ({
  children,
  successChildren,
  success,
  successClassName = "p-8 my-8 text-xl font-semibold rounded-md border-2 border-green-600 w-fit mx-auto image-dots bg-green-400 from-green-600",
  successProps,
  oneTime,
  ...props
}: FormProps) => {

  const showForm = oneTime ? !success : true;
  const showSuccess = oneTime ? success : false;

  return (
    <>
      <AnimatePresence mode="wait">
        {showForm && <motion.form
          key="form"
          variants={fadeAnim}
          initial="in"
          animate="anim"
          exit="exit"
          {...props}
        >
          {children}
        </motion.form>}
        {showSuccess && <motion.div
          key="success"
          className={successClassName}
          variants={fadeAnim}
          initial="in"
          animate="anim"
          exit="exit"
          {...successProps}
        >
          {successChildren}
        </motion.div>}
      </AnimatePresence>
    </>
  );
};

export default Form;;