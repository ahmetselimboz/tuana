"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import SlideUpOnScroll from "./SlideUpOnScroll";


const testimonials = [
    {
        quote: "Tuana is a game changer when it comes to understanding user behavior! Within seconds, I discovered which pages on my site were boring or where visitors were hanging out, and thanks to these insights, I increased my conversion rate in no time!",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
            "Thanks to Tuana's artificial intelligence, it's easy to find out at what point my visitors give up and what I need to improve. We are now taking the right steps to optimize our user experience.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "Since we started using Tuana, we've seen a noticeable increase in site performance. Especially the AI-based suggestions clearly show me where I need to make improvements. Increasing user satisfaction has never been easier.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
            "Seeing where my visitors were wasting time and taking immediate action took our business one step forward. Thanks to Tuana, customer feedback has also become incredibly positive.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
            "Before using Tuana, I would spend hours trying to understand the problems on the site. Now, I notice problems faster. I have gained back the time I lost doing manual analysis.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];

export function InfiniteMovingCardsDemo() {
    return (
        <>
            <div className="w-full  flex items-center justify-start   bg-transparent mt-32 mb-8">
                <div className="relative w-full h-auto flex items-center justify-center ">
                    <SlideUpOnScroll className='relative z-10 w-fit  bg-main'>
                        <div className='text-primary font-medium lg:text-6xl text-4xl inline-block text-center'>
                            Hey, people seem to love us too! 😊
                        </div>
                    </SlideUpOnScroll>

                </div>
            </div>
            <div className="mb-24 relative z-10 rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center  overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
                <InfiniteMovingCards
                    items={testimonials}
                    direction="left"
                    speed="slow"
                />
            </div>
        </>

    );
}

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        (<div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}>
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}>
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] bg-primaryGray max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"

                        key={item.name}>
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>
                            <span
                                className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                                {item.quote}
                            </span>
                                {/* <div className="relative z-20 mt-6 flex flex-row items-center">
                                    <span className="flex flex-col gap-1">
                                        <span className=" text-sm leading-[1.6] text-gray-200 font-normal">
                                            {item.name}
                                        </span>
                                        <span className=" text-sm leading-[1.6] text-gray-200 font-normal">
                                            {item.title}
                                        </span>
                                    </span>
                                </div> */}
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>)
    );
};
