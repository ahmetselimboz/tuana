"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroAnimation = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
    );
  }, []);

  return (
    <div>
      <h1 ref={titleRef}>Connect With People</h1>
      <p ref={textRef}>
        Make real connections and enjoy spontaneous interactions...
      </p>
      {/* Diğer içerikler */}
    </div>
  );
};

export default HeroAnimation;
