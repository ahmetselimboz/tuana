// components/ScaleAnimation.js
"use client";
import { motion } from "framer-motion";

const ScaleAnimation = ({ children, className }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      className={className} // Burada doğrudan className'i kullanıyoruz
    >
      {children}
    </motion.div>
  );
};

export default ScaleAnimation;

