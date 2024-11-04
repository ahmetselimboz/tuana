"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "../../../../components/ui/3d-card";
import Link from "next/link";
import Loading from "@/app/loading";
import { IoIosArrowUp } from "react-icons/io";
import { TextGenerateEffect } from "../../Animation/TextGenerateEffect";
import SlideInFromRight from "../../Animation/SlideInFromRight";
import SlideInFromLeft from "../../Animation/SlideInFromLeft";

const words = `Your page titled "Features of Tuana" is getting fewer clicks than expected. To attract users' attention, consider adding more visible buttons or banners on the homepage or other popular pages that lead to this page. You can also attract visitors by making the title and description of the "Features of Tuana" page more attractive. If the content is appropriate, offering discounts or special offers can also increase the appeal of this page.`;

export function TextGenerateEffectDemo() {
    return (
        <>
            <TextGenerateEffect duration={1} filter={false} words={words} />
        </>
    );
}

export function ThreeDCardThird() {
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
                            className="bg-gray-50 relative border-primary/20 group/card shadow-xl hover:shadow-2xl transition-all dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  w-auto sm:w-[30rem] h-80 rounded-xl p-6 border  ">
                            {/* 
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
                        } */}

                            {/* <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                        src="/background-2.jpg"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail" />
                </CardItem> */}
                            {/* <div className="flex justify-between items-center mt-20">
                    <CardItem
                        translateZ={20}
                        as={Link}
                        href="https://twitter.com/mannupaaji"
                        target="__blank"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                        Try now →
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                        Sign up
                    </CardItem>
                </div> */}
                        </CardBody>
                    </CardContainer>
                </SlideInFromLeft>
                <SlideInFromRight className='w-full h-full flex flex-col items-start justify-start px-16 py-8'>
                    <div className='text-primary font-semibold text-4xl mb-3 '>
                        Rhoncus praesent eros lectus ex iaculis dignissim posuere tempus.
                    </div>
                    <div className='text-primaryGray text-2xl leading-snug tracking-wide'>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Consequat gravida finibus cubilia suscipit sit integer. Condimentum malesuada eget dis penatibus nibh eleifend magnis facilisis. Accumsan ipsum maximus sem sed metus dis dolor. Nulla felis fringilla venenatis, nascetur euismod ac.
                    </div>
                </SlideInFromRight>
            </>
        )
    );
}
