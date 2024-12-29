"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollLockWithAnimation = () => {
  const scrollSectionRef = useRef(null); // Ref for scroll-lock section
  const sentenceContainerRef = useRef(null); // Ref for the sentence container
  const words = ["Merhaba", "Dünya", "Scroll", "Animasyonu"]; // Words for animation

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calculate the total scrollable width
      const totalWidth = window.innerWidth * (words.length - 1);

      // Horizontal scroll animation for the entire sentence
      gsap.to(sentenceContainerRef.current, {
        x: () => `-${totalWidth}px`, // Move the sentence container to the left
        ease: "none",
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`, // Scroll duration based on words count
          scrub: 1,
          pin: true, // Locks the section during scrolling
        },
      });

      // Slide-up animation for each word
      words.forEach((_, index) => {
        const word = sentenceContainerRef.current.children[index];

        gsap.fromTo(
          word,
          { opacity: 0, y: 50 }, // Start: Hidden below
          { opacity: 1, y: 0, duration: 0.5 }, // End: Visible at original position
          {
            scrollTrigger: {
              trigger: scrollSectionRef.current,
              start: () => `top+=${index * window.innerWidth} center`, // Trigger for each word
              end: () => `top+=${(index + 1) * window.innerWidth} center`,
              scrub: true,
            },
          }
        );
      });
    }, scrollSectionRef);

    return () => {
      ctx.revert(); // Cleanup GSAP context
    };
  }, [words]);

  return (
    <div>
      {/* Section before scroll-lock */}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl">Scroll aşağıya</h1>
      </div>

      {/* Scroll-lock section */}
      <div
        ref={scrollSectionRef}
        className="h-screen bg-blue-200 flex items-center justify-center overflow-hidden relative"
      >
        <div
          ref={sentenceContainerRef}
          className="flex gap-16 text-4xl font-bold text-gray-800"
          style={{ whiteSpace: "nowrap" }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="inline-block word"
              style={{
                minWidth: `${window.innerWidth}px`,
                textAlign: "center",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Section after scroll-lock */}
      <div className="h-screen flex items-center justify-center bg-gray-300">
        <h1 className="text-3xl">Scroll devam</h1>
      </div>
    </div>
  );
};

export default ScrollLockWithAnimation;
