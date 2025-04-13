"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import HeaderText from "./HeaderText";

const titleClass = "w-full text-xl text-secondary  text-center sm:text-4xl font-bold  mb-8 md:text-7xl md:leading-[6rem] "
const altTitleClass = "text-xl text-primaryGray text-primaryGray font-normal w-3/6 text-center mb-4"
const altTitleDelay = 0.02

const items = [
  {
    title: <HeaderText text="Why Don’t Visitors Turn Into Customers?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Are people visiting your site but leaving without buying or signing up? Discover why and turn them into loyal customers." />
  },
  {
    title: <HeaderText text="Which Products Do Users Like Most?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Do you know which offerings catch the most attention? Learn what works and promote it effectively." />
  },
  {
    title: <HeaderText text="Is My Marketing Reaching the Right People?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Are your ads and campaigns reaching your target audience? Find out what drives real results." />
  },
  {
    title: <HeaderText text="Why Do Users Leave at Checkout?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Do customers abandon their carts at the last step? Identify and fix the reasons quickly." />
  },
  {
    title: <HeaderText text="How Can I Improve on a Budget?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Optimize your platform efficiently with actionable insights—no big investments needed." />
  },
  {
    title: <HeaderText text="Web or Mobile: Which Is Better?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Find out which platform your audience prefers and focus your efforts there." />
  },
  {
    title: <HeaderText text="What Keeps Users From Returning?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Identify why your visitors don’t return and build long-term loyalty with smart changes." />
  },
  {
    title: <HeaderText text="Am I Making Smart Decisions?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Use data-driven insights to ensure every decision leads to growth." />
  },
  {
    title: <HeaderText text="Which Pages Convert the Best?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Understand what’s converting visitors into customers and do more of it." />
  },
  {
    title: <HeaderText text="Where Should I Focus First?" className={titleClass} />,
    altTitle: <HeaderText delay={altTitleDelay} className={altTitleClass} text="Identify the most impactful areas to invest your time and resources for faster growth." />
  }
];




const InfiniteScrollAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000); // Display duration: 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-6/6   overflow-hidden">
      <motion.div
        key={currentIndex}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="animated-item flex flex-col items-center w-full"
      >
        <div className="w-fit px-2">
          {items[currentIndex].title}
          {/* <motion.div key={currentIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex justify-start  mb-6">
            <hr className="border-b-4 border-secondary/20 w-1/3 rounded-md" />

          </motion.div> */}
        </div>

        {items[currentIndex].altTitle}
      </motion.div>
      {/* <motion.div
        key={currentIndex}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="animated-item"
      >
       
      </motion.div> */}
    </div>
  );
};

export default InfiniteScrollAnimation;
