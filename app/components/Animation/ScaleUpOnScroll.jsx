import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScaleUpOnScroll = ({ children, className, delay=0, threshold=0.4 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: threshold, 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 40, delay:delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleUpOnScroll;
