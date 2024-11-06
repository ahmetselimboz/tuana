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



export function ThreeDCardSecond() {
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
            <div className="flex lg:flex-row flex-col-reverse">
                <SlideInFromLeft className='w-full h-full flex flex-col items-start justify-start  lg:px-16 py-8 '>
                    <div className='text-primary font-semibold lg:text-4xl text-3xl mb-3 mt-5'>
                        Your Analytics Power is Always With You!
                    </div>
                    <div className='text-primaryGray lg:text-2xl text-xl leading-snug tracking-wide mb-8'>
                        Access your data anytime, anywhere with Tuana's mobile app. Instantly see visitor flow, popular pages and user behavior; easily access insights that will strengthen your website. Whether you are on the road or in the office, Tuana's powerful analytics are always at your fingertips!
                    </div>
                    <div className='w-full h-1/6 flex items-center justify-start lg:flex-row flex-col lg:ml-4 lg:mb-0 '>
                        <h2 className='text-stone-900 font-dosis font-semibold text-3xl mr-3'>Download Now!</h2>
                        <div className='lg:w-1/2 w-full h-full flex items-center justify-center gap-2'>
                            <Link href="/" target='_blank'>
                                <img src="/GooglePlay.png" alt="GooglePlay.png" className='w-fit h-auto' />
                            </Link>
                            <Link href="/" target='_blank'>
                                <img src="/AppStore.png" alt="AppStore.png" className='w-fit h-auto' />
                            </Link>
                        </div>
                    </div>
                </SlideInFromLeft>
                <SlideInFromRight>
                    <CardContainer className="inter-var lg:mt-0 mt-8 ">
                        <CardBody
                            className=" relative h-[500px]  bg-transparent group/card flex items-center justify-center transition-all dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  lg:w-auto w-full  sm:w-[30rem]  rounded-xl   ">
                            <Image
                                src="/Tuana_Phone.png"
                                height="1000"
                                width="1000"
                                className="h-full w-fit object-contain rounded-xl drop-shadow-xl hover:drop-shadow-2xl"
                                alt="thumbnail" />

                        </CardBody>
                    </CardContainer>
                </SlideInFromRight>


            </div>
        )
    );
}
