"use client"

import { useAxios } from '@/app/hooks/useAxios';
import { useAppSelector } from '@/lib/redux/hooks';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Sidebar from "@/app/components/Analytics/sidebar"
import useWidth from '@/app/hooks/useWidth';
import { useToast } from '@/hooks/use-toast';
import AuthenticatedNavbar from "@/app/components/Navbar/authenticatednavbar"
import FullsizeChatField from '@/app/components/Ai/FullsizeChatField';
import Footer from "@/app/components/Footer/footer"
import Loading from '@/app/loading';

const page = () => {

    const date = useAppSelector((state) => state.dateSettings)

    const params = useSearchParams()
    const appId = params.get("id")

    const [adsActive, setAdsActive] = useState(true)
    const { width } = useWidth()
    const { toast } = useToast()

    const isFullScreen = useAppSelector((state) => state.chatSettings.isChatFullscreen)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const closePopup = () => setIsPopupOpen(false);
    const [seoData, setSeoData] = useState(null)



    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        await sendRequest({
            method: "POST",
            url: `/api/ai/get-seo`,
            baseURL: process.env.NEXT_PUBLIC_AI_SERVER_URL,
            body: {
                appId: appId,
                query: {
                    firstdate: date.firstDate,
                    lastdate: date.lastDate
                }
            },
        });
    };

    // useEffect(() => {
    //     handleRequest()
    // }, [date.lastDate, date.firstDate])

    useEffect(() => {
        if (loading) {

            console.log("🚀 ~ languagecard ~ languages:", res)
            setSeoData(res?.data)

        }
    }, [res, loading])





    return (
        <>
            {
                isFullScreen ? (
                    <div className='relative z-40'>
                        <FullsizeChatField
                            userInfo={userInfo}
                            setIsPopupOpen={setIsPopupOpen}
                        ></FullsizeChatField>
                    </div>

                ) : null



            }

            <div className=' w-full h-auto bg-main'>
                <AuthenticatedNavbar />
                <div className="w-full lg:h-20 h-10"></div>
                <div className="w-full h-full flex items-start relative mb-6">
                    {
                        width <= 1024 ? (<div></div>) : (<Sidebar closePopup={closePopup} setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen}></Sidebar>)
                    }
                    <div className='lg:w-4/6 w-full lg:ml-[16.67%] px-8 py-4'>
                        {
                            loading ? (
                                <Loading></Loading>
                            ) : (

                                <div className=" flex flex-col ">
                                    <div className='w-full flex items-center justify-center'>
                                        <button onClick={() => { handleRequest() }} className='text-xl text-center text-main font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Analyze</button>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            )
                        }
                    </div>



                    <div className="lg:block hidden w-1/6 h-full px-4">
                        <div className="w-full h-20"></div>
                        {
                            adsActive ? (
                                <>
                                    <div className="w-full h-[700px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                                        <div className="text-main font-dosis text-2xl">Ad space</div>
                                    </div>
                                    <div className="w-full h-[700px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                                        <div className="text-main font-dosis text-2xl">Ad space</div>
                                    </div>
                                    <div className="w-full h-[700px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                                        <div className="text-main font-dosis text-2xl">Ad space</div>
                                    </div>
                                </>
                            ) : (
                                <div></div>
                            )
                        }

                    </div>
                </div>
            </div>
            <div className="w-full h-fit flex">
                <div className="lg:block hidden w-1/6 h-full"></div>
                <div className="lg:w-5/6 w-full h-full">
                    <Footer></Footer>
                </div>
            </div>
        </>
    )
}

export default page