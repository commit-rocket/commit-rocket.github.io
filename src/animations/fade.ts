import { Variants } from "framer-motion";

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
} as Variants;

export default fadeAnim;