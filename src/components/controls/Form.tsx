import { ReactNode } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import fadeAnim from "@/animations/fade";

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
  successClassName = "p-8 my-8 text-xl font-semibold rounded-2xl border-2 border-green-600 w-fit mx-auto image-star bg-green-400",
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