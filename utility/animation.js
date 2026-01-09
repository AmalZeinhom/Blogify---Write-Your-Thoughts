import { easeInOut } from "framer-motion";

export const slideRight = (delay = 0) => ({
  hidden: {
    x: 100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: easeInOut,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
});
