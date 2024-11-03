import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SlideInFromRight = ({ children, className, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Sadece ilk defa görünümde olduğunda çalışsın
    threshold: 0.1, // Görünümün %10'u ekranda olunca tetiklenir
  });

  return (
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0, scale: 1 }}
      animate={inView ? { x: 0, opacity: 1, scale: 1 } : { x: 100, opacity: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 40, delay: delay }}
      className={`${className}`} 
    >
      {children}
    </motion.div>
  );
};

export default SlideInFromRight;
