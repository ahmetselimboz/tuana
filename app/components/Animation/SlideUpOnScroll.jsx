import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SlideUpOnScroll = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Sadece ilk defa görünümde olduğunda çalışsın
    threshold: 0.4, // Görünümün %10'u ekranda olunca tetiklenir
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 40 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpOnScroll;
