import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30,
  });

  const skewVelocityFactor = useTransform(
    skewVelocity,
    [-1000, 1000],
    [-30, 30]
  );

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -5 * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
    if (velocityFactor.get() !== 0) {
    }
  });

  return (
    <div className="parallax cursor-default select-none">
      <motion.div className="lg:text-8xl text-7xl scroller" style={{ x }}>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
        <motion.span style={{ skew: skewVelocityFactor }}>
          {children}
        </motion.span>
      </motion.div>
    </div>
  );
}

export default ParallaxText;