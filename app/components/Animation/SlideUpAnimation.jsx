import { motion } from "framer-motion";

const SlideUpAnimation = ({ children, className, delay=0 }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay:delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpAnimation;
