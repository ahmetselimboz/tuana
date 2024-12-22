import React from "react";
import { BentoGrid, BentoGridItem } from "../Animation/BentoGrid";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconBrain,
    IconChartLine,
    IconClipboardCopy,
    IconEye,
    IconFileBroken,
    IconHeart,
    IconRocket,
    IconSignature,
    IconTableColumn
} from "@tabler/icons-react";
import ScaleUpOnScroll from "../Animation/ScaleUpOnScroll";
import SlideInFromLeft from "../Animation/SlideInFromLeft";
import SlideUpOnScroll from "../Animation/SlideUpOnScroll";
import { LampDemo } from "../Animation/Lamp";

import ThreeDCard from "./ThreeDCard";
import { FeaturesSectionDemo } from "../Animation/FeaturesSectionDemo";
import { InfiniteMovingCardsDemo } from "../Animation/InfiniteMovingCards";

export function BentoGridDemo() {
    return (
        <div className="overflow-hidden">

            <div className="w-full  flex items-center justify-start  lg:ml-10 bg-transparent mb-12">
                <div className="relative w-full lg:h-[200px] h-[100px] flex items-center justify-center lg:ml-12">
                    <SlideUpOnScroll className='relative z-10 lg:text-7xl text-4xl w-fit lg:pr-8 pr-4 bg-main'>
                        <div className='text-primaryGray mr-3 inline-block'>
                            Why
                        </div>
                        <div className='text-primary font-medium inline-block'>
                            Tuana?
                        </div>
                    </SlideUpOnScroll>
                    <ScaleUpOnScroll delay={0.4} className='relative z-10 h-1/3 border border-primaryGray/20 mr-4 '>

                    </ScaleUpOnScroll>
                    <div className='relative z-0 w-fit flex items-start justify-center '>
                        <SlideInFromLeft delay={0.8} className='text-primaryGray font-light lg:text-2xl text-lg text-center'>
                            Because why not?

                        </SlideInFromLeft>
                    </div>
                </div>
            </div>
            {/* <TextGenerateEffectDemo></TextGenerateEffectDemo> */}

            <ThreeDCard></ThreeDCard>
            <div className="w-full  flex items-center justify-start bg-transparent lg:mt-0 mt-8">
                <div className="relative w-full lg:h-[100px] flex items-center justify-center">
                    <SlideUpOnScroll className='relative z-10 w-fit  bg-main'>
                        <div className='text-primaryGray text-4xl  inline-block'>
                            ... And More
                        </div>

                    </SlideUpOnScroll>

                </div>
            </div>
            
            <FeaturesSectionDemo></FeaturesSectionDemo>

            <InfiniteMovingCardsDemo></InfiniteMovingCardsDemo>

        </div>
    );
}
const Skeleton = ({ icon }) => (
    <div
        className="flex items-center justify-center flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
  
    </div>
);
const items = [
    {
        title: "Instant Insights",
        description: "Monitor user actions in real-time with immediate feedback.",
        header: <Skeleton/>,
        icon: <IconEye className="h-4 w-4 text-neutral-500" />,

    },
    {
        title: "Transform Data into Action",
        description: "Convert interactions into meaningful, actionable insights.",
        header: <Skeleton />,
        icon: <IconChartLine className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Smart AI-Powered Analytics",
        description: "Beyond raw data, Tuana’s AI identifies gaps and suggests solutions.",
        header: <Skeleton />,
        icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Optimize with Ease",
        description: "Spot weaknesses and improve user experiences seamlessly.",
        header: <Skeleton />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Boost Engagement",
        description: "Enhance user satisfaction with actionable insights and feedback.",
        header: <Skeleton />,
        icon: <IconHeart className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Drive Growth",
        description: "Help your business evolve with smart, data-driven optimizations.",
        header: <Skeleton />,
        icon: <IconRocket className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Spirit of Adventure",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Skeleton />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },

];

// const items = [
//     {
//       title: "The Dawn of Innovation",
//       description: "Explore the birth of groundbreaking ideas and inventions.",
//       header: <Skeleton />,
//       icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//       title: "The Digital Revolution",
//       description: "Dive into the transformative power of technology.",
//       header: <Skeleton />,
//       icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//       title: "The Art of Design",
//       description: "Discover the beauty of thoughtful and functional design.",
//       header: <Skeleton />,
//       icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//       title: "The Power of Communication",
//       description:
//         "Understand the impact of effective communication in our lives.",
//       header: <Skeleton />,
//       icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//       title: "The Pursuit of Knowledge",
//       description: "Join the quest for understanding and enlightenment.",
//       header: <Skeleton />,
//       icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//       title: "The Joy of Creation",
//       description: "Experience the thrill of bringing ideas to life.",
//       header: <Skeleton />,
//       icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//       title: "The Spirit of Adventure",
//       description: "Embark on exciting journeys and thrilling discoveries.",
//       header: <Skeleton />,
//       icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
//     },
//   ];

