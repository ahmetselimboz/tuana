import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SlideDownOnScroll = ({ children, className, delay=0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}  // Başlangıç konumu aşağıda
      animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}  // Yukarı doğru hareket
      transition={{ type: "spring", stiffness: 200, damping: 40, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideDownOnScroll;
