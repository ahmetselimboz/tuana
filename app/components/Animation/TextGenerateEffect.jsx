"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { HiOutlineSparkles } from "react-icons/hi";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  setGenerateField
}) => {
  const [scope, animate] = useAnimate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  let wordsArray = words.split(' ');

  useEffect(() => {
    if (inView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );
    }
  }, [inView, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="dark:text-white text-main opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)} ref={ref}>
      <div className="mt-4 flex items-start justify-start">

        <div className="w-fit">
          <div className='w-10 h-10 rounded-full transition-all mr-2  text-2xl text-primary   shadow-lg  bg-gradient-to-b from-main to-zinc-200  border-2 border-primary flex items-center justify-center flex-row'>

            <HiOutlineSparkles className='' />

          </div>
        </div>
        <div className="dark:text-white w-5/6 rounded-tl-none bg-primary rounded-xl px-4 py-6 text-main text-base font-medium leading-snug tracking-wide">
          {renderWords()}
          <div className="flex items-center justify-end">
            <button onClick={()=>{setGenerateField(false)}} className="bg-main text-primary hover:bg-gray-200 hover:text-secondary rounded-full px-4 py-2 ">Thanks!</button>
          </div>
        </div>
      </div>
    </div>
  );
};
