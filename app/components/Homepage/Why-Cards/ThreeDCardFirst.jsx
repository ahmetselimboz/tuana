"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "../../../../components/ui/3d-card";
import Link from "next/link";
import Loading from "@/app/loading";
import { IoIosArrowUp } from "react-icons/io";
import { TextGenerateEffect } from "../../Animation/TextGenerateEffect";
import SlideInFromLeft from "../../Animation/SlideInFromLeft";
import SlideInFromRight from "../../Animation/SlideInFromRight";

const words = `Your page titled "Features of Tuana" is getting fewer clicks than expected. To attract users' attention, consider adding more visible buttons or banners on the homepage or other popular pages that lead to this page. You can also attract visitors by making the title and description of the "Features of Tuana" page more attractive. If the content is appropriate, offering discounts or special offers can also increase the appeal of this page.`;

export function TextGenerateEffectDemo() {
    return (
        <>
            <TextGenerateEffect duration={1} filter={false} words={words} />
        </>
    );
}

export function ThreeDCardFirst() {
    const [generateField, setGenerateField] = useState(false)
    const [loading, setLoading] = useState(false)

    const generateText = () => {
        setLoading(true)
        setInterval(() => {
            setGenerateField(true)
            setLoading(false)
        }, 1000)
    }



    return (
        (
            <>
                <SlideInFromLeft>
                    <CardContainer className="inter-var  ">
                        <CardBody
                            className="bg-gray-50 relative border-primary/20 group/card shadow-xl hover:shadow-2xl transition-all dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">

                            <CardItem translateZ="50" className="text-primary font-dosis text-3xl px-2 font-medium mb-3">
                                Your Pages
                                <hr className="border-b-2 border-primary w-1/3" />
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-primaryGray text-sm max-w-sm mt-2 dark:text-neutral-300">
                                You can get advice about your pages by consulting the Tuan-AI
                            </CardItem>

                            {
                                loading ? (
                                    <CardItem translateZ="100" className="w-full min-h-60 mt-4 flex items-center justify-center">
                                        <Loading></Loading>

                                    </CardItem>
                                ) : (

                                    generateField ? (
                                        <CardItem translateZ="100" className="w-full h-fit mt-4 flex items-center justify-center">
                                            <TextGenerateEffectDemo></TextGenerateEffectDemo>
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

                                )
                            }

                        </CardBody>
                    </CardContainer>
                </SlideInFromLeft>

                <SlideInFromRight className='w-full h-full flex flex-col items-start justify-start px-16 py-8'>
                    <div className='text-primary font-semibold text-4xl mb-3 '>
                        Experience Tuan-AI!
                    </div>
                    <div className='text-primaryGray text-2xl leading-snug tracking-wide'>
                        Optimize your website with Tuana's smart recommendation feature! This feature analyzes user behavior and provides recommendations to improve the performance of your pages. Do you have a page with a low number of visits? Tuan-AI recognizes this and gives you specific recommendations to attract more visitors.
                    </div>
                </SlideInFromRight>
            </>
        )
    );
}
