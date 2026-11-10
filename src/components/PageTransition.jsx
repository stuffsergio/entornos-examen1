import { useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../lib/course";

export default function PageTransition({ children }) {
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      id="contenido"
      className="page"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, y: -20 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: easeOut }}
    >
      {children}
    </motion.main>
  );
}
