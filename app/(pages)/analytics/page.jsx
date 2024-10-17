"use client"

import React, { Suspense, useEffect, useState } from 'react'
import AuthenticatedNavbar from "@/app/components/Navbar/authenticatednavbar"
import Footer from "@/app/components/Footer/footer"
import Sidebar from "@/app/components/Analytics/sidebar"
import Linecard from "@/app/components/Analytics/lineCard/linecard"
import Devicecard from "@/app/components/Analytics/devicecard"
import Pagescard from "@/app/components/Analytics/pagescard"
import Locationcard from "@/app/components/Analytics/locationcard"
import Sourcescard from "@/app/components/Analytics/sourcescard"
import Languagecard from "@/app/components/Analytics/languagecard"
import Fastcard from "@/app/components/Analytics/fastCard/fastcard"
import useWidth from '@/app/hooks/useWidth'
import TuanalyticsSvg from "../../components/Homepage/tuanalyticsSvg"
import Loading from '@/app/loading'
import { HiOutlineSparkles } from 'react-icons/hi'
import LargeAIBtn from '@/app/components/Ai/LargeAIBtn'
import SmallAIBtn from '@/app/components/Ai/SmallAIBtn'

const Analytics = () => {

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedDropdown, setSelectedDropdown] = useState(new Date() ? "today" : null);
  const [adsActive, setAdsActive] = useState(false)
  const { width } = useWidth()

  return (
    <>
      <div className=' w-full h-auto bg-main'>
        <AuthenticatedNavbar />
        <div className="w-full h-20"></div>
        <div className="w-full h-full flex items-start relative mb-6">
          {
            width <= 1024 ? (<div></div>) : (<Sidebar></Sidebar>)
          }

          <div className="lg:w-4/6 w-full flex flex-col lg:ml-[16.67%] px-8 py-4">
            <div className="w-full flex items-center justify-between lg:flex-row flex-col my-3">
              <div className="lg:w-1/2 w-full flex flex-col my-3 mx-2">
                <div className="text-stone-900  font-dosis lg:text-4xl text-5xl flex gap-2 ">Hello, <div className="font-medium ">Tuana!</div></div>
                <div className="text-stone-900  font-dosis lg:text-lg text-xl">We've done all the analysis for you ✨</div>
              </div>
              <div className="lg:w-1/2 w-full flex items-center lg:justify-end justify-center mt-4 mb-3 mx-2">
                <LargeAIBtn></LargeAIBtn>
                {/* <input type="text" className="font-dosis  w-1/2 outline-none px-4 py-2 rounded-md shadow-xl border border-stone-900/20 bg-main" placeholder="Filter..." /> */}
              </div>
            </div>
            <Suspense fallback={<Loading width="w-14" height="h-14" />}>
              <Fastcard></Fastcard>
            </Suspense>
            <Suspense fallback={<Loading width="w-14" height="h-14" />}>
              <Linecard></Linecard>
            </Suspense>
            <div className="w-full h-full flex items-center lg:flex-row flex-col gap-3 mb-12">
              <div className="lg:w-1/2 w-full h-full ">
                <div className='w-full flex flex-row items-center justify-between relative'>
                  <div className="text-primary font-dosis text-3xl px-2 font-medium mb-3 ">
                    Devices
                    <hr className="border-b-2 border-primary w-[38px]" />
                  </div>

                  <div className='w-full h-[71px] flex items-center justify-end absolute'>
                    <SmallAIBtn></SmallAIBtn>
                  </div>


                </div>
                <Devicecard></Devicecard>
                <div className="w-full h-[122px] flex items-center justify-center">
                  {
                    adsActive ? (
                      <div className="w-[90%] h-full bg-primaryGray flex items-center justify-center  rounded-md overflow-hidden ">
                        <div className="text-main font-dosis text-2xl">Ad space</div>
                      </div>
                    ) : (
                      <div className="w-[90%] h-full flex items-center justify-center  rounded-md overflow-hidden ">
                        <hr className="w-1/4 border-b-2 border-secondary/20 mx-2" />
                        <TuanalyticsSvg classn={"w-2/4 drop-shadow-lg"}></TuanalyticsSvg>
                        <hr className="w-1/4 border-b-2 border-secondary/20 mx-2" />
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="lg:w-1/2 w-full h-fit flex flex-col items-start">
                <div className='w-full flex flex-row items-center justify-between relative'>
                  <div className="text-primary font-dosis text-3xl px-2 font-medium mb-3">
                    Top Pages
                    <hr className="border-b-2 border-primary w-1/3" />
                  </div>
                  <div className='w-full h-[71px] flex items-center justify-end absolute'>
                    <SmallAIBtn></SmallAIBtn>
                  </div>
                </div>
                <Pagescard ></Pagescard>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col items-start mb-12">

              <div className='w-full flex flex-row items-center justify-between relative'>
                <div className="text-primary font-dosis text-3xl px-2 font-medium mb-3">
                  Locations
                  <hr className="border-b-2 border-primary w-1/3" />

                </div>
                <div className='w-full h-[71px] flex items-center justify-end absolute'>
                    <SmallAIBtn></SmallAIBtn>
                  </div>
              </div>
              <Locationcard></Locationcard>
            </div>
            <div className="w-full h-full flex items-center lg:flex-row flex-col gap-3 mb-12">
              <div className="lg:w-1/2 w-full h-full flex flex-col items-start justify-center lg:mb-0 mb-8">

                <div className='w-full flex flex-row items-center justify-between relative'>
                  <div className="text-primary font-dosis text-3xl px-2 font-medium mb-3">
                    Top Sources
                    <hr className="border-b-2 border-primary w-1/3" />
                  </div>
                  <div className='w-full h-[71px] flex items-center justify-end absolute'>
                    <SmallAIBtn></SmallAIBtn>
                  </div>
                </div>
                <Sourcescard></Sourcescard>
              </div>
              <div className="lg:w-1/2 w-full h-fit flex flex-col items-start">
                <div className='w-full flex flex-row items-center justify-between relative'>
                  <div className="text-primary font-dosis text-3xl px-2 font-medium mb-3">
                    Browser Languages
                    <hr className="border-b-2 border-primary w-1/3" />
                  </div>
                  <div className='w-full h-[71px] flex items-center justify-end absolute'>
                    <SmallAIBtn></SmallAIBtn>
                  </div>
                </div>
                <Languagecard></Languagecard>
              </div>

            </div>
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

export default Analytics