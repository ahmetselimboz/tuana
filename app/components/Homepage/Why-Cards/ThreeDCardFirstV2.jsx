"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../../../../components/ui/3d-card";
import Link from "next/link";
import Loading from "@/app/loading";
import { IoIosArrowUp } from "react-icons/io";
import { TextGenerateEffect } from "../../Animation/TextGenerateEffect";
import SlideInFromLeft from "../../Animation/SlideInFromLeft";
import SlideInFromRight from "../../Animation/SlideInFromRight";

const words = `
Hello! Hello! Hello! Hello! I'm the smart assistant inside Tuana. It's so nice to meet you 😊 Every analysis, every suggestion you see on Tuana is actually the result of my subtle calculations - the goal is to make your job easier and maximize your user experience!

If you want to see your users' behavior in real time, where they struggle, where they spend the most time, Tuana is for you! And with my recommendations, you'll discover where there is room for improvement or where you can make performance improvements. I'm here to both analyze data and suggest solutions - not just “what is happening” but also “what needs to be done”.

Try Tuana, because together we can discover what users expect and what can be done for a better experience. I'm here to give you more conversions, happier users and a high performing platform! Remember, I'm just a click away 😉

`;

export function TextGenerateEffectDemo({setGenerateField}) {
    return (
        <>
            <TextGenerateEffect duration={0.2} filter={false} words={words} setGenerateField={setGenerateField}/>
        </>
    );
}

export function ThreeDCardFirstV2() {
    const [generateField, setGenerateField] = useState(false)
    const [loading, setLoading] = useState(false)

    const generateText = () => {
        setLoading(true)
       
        setTimeout(() => {
            setGenerateField(true)
            setLoading(false)
        }, 1000)
    }



    return (
        (
            <div className="flex lg:flex-row flex-col">
                <SlideInFromLeft>
                    <CardContainer className="inter-var  ">
                        <CardBody
                            className={`${generateField ? "bg-transparent w-full   sm:w-[30rem] h-auto  p-6":"bg-gray-50 border-primary/20 group/card shadow-xl hover:shadow-2xl transition-all dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  lg:w-auto w-full sm:w-[30rem] h-auto rounded-xl p-6 border"} relative `}>

                            {

                                generateField ? (
                                    <CardItem translateZ="100" className="w-[570px]  h-fit mt-4 flex items-center justify-center absolute top-0 left-0">
                                        <TextGenerateEffectDemo setGenerateField={setGenerateField}></TextGenerateEffectDemo>
                                       

                                    </CardItem>
                                ) : (
                                    <CardItem translateZ="100" className="w-full min-h-60 mt-4 flex flex-col items-center justify-center">
                                        <button onClick={() => { generateText() }} className="w-fit h-12 mb-1 rounded-full cursor-pointer transition-all px-4 hover:w-fit text-lg text-primary hover:text-main hover:bg-gradient-to-b hover:from-primary hover:to-primary shadow-lg hover:shadow-xl bg-gradient-to-b from-main to-zinc-200  border-2 border-primary flex items-center justify-center flex-row">Take the Advice</button>
                                        <div className="flex flex-col items-center justify-center">
                                            <IoIosArrowUp className="text-primaryGray/80" />
                                            <div className="text-primaryGray/80 ">
                                                Click!
                                            </div>
                                        </div>
                                    </CardItem>
                                )
                            }

                        </CardBody>
                    </CardContainer>
                </SlideInFromLeft>

                <SlideInFromRight className='w-full h-full flex flex-col items-start justify-start lg:px-16 py-8 lg:mt-0 mt-8'>
                    <div className='text-primary font-semibold lg:text-4xl text-3xl mb-3 '>
                        Experience Tuan-AI!
                    </div>
                    <div className='text-primaryGray lg:text-2xl text-xl leading-snug tracking-wide'>
                        Optimize your website with Tuana's smart recommendation feature! This feature analyzes user behavior and provides recommendations to improve the performance of your pages. Do you have a page with a low number of visits? Tuan-AI recognizes this and gives you specific recommendations to attract more visitors.
                    </div>
                </SlideInFromRight>
            </div>
        )
    );
}
