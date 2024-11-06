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
            <div className="flex lg:flex-row flex-col lg:mt-0 mt-8">
                <SlideInFromLeft>
                    <CardContainer className="inter-var  ">
                        <CardBody
                            className="bg-transparent relative  group/card  transition-all dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  lg:w-auto w-full sm:w-[30rem] h-fit rounded-xl    ">

                            <Image
                                src="/gdpr.png"
                                height="1900"
                                width="1500"
                                className="h-full w-full object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all"
                                alt="thumbnail" />
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
                <SlideInFromRight className='w-full h-full flex flex-col items-start justify-start lg:px-16 py-8'>
                    <div className='text-primary font-semibold lg:text-4xl text-3xl mb-3 '>
                        Privacy-First Analytics, No Consent Needed!
                    </div>
                    <div className='text-primaryGray lg:text-2xl text-xl leading-snug tracking-wide'>
                        Tuana delivers meaningful insights without compromising user privacy. Our platform analyzes site interactions anonymously—no cookies, no personal data, and no unique identifiers involved. We respect the boundaries of each session without tracking users across devices or websites. Data is processed securely on European-owned servers, ensuring it stays within the EU and is solely used for your analysis needs.                    </div>
                </SlideInFromRight>
            </div>
        )
    );
}
