import Link from 'next/link'
import React from 'react'
import Parallax from "@/app/components/Homepage/parallax"
import TuanalyticsSvg from "./tuanalyticsSvg"
import BackgroundAnimation from "./BackgroundAnimation";
import SlideUpAnimation from '../Animation/SlideUpAnimation';

const header = () => {
  return (
    <div className="relative w-full h-screen bg-main overflow-hidden">
      {/* Background Animation */}
      <SlideUpAnimation className="w-full h-full absolute bottom-0 overflow-hidden " delay={0.4}>
        <BackgroundAnimation />
      </SlideUpAnimation>

      {/* Main Content */}
      <SlideUpAnimation className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 sm:px-8">
        <div className="w-full h-full flex flex-col items-center lg:justify-center custom-radial lg:mt-0 mt-28">
          {/* Logo */}
          <div className="w-full max-w-[650px] font-dosis">
            <TuanalyticsSvg classn="" />
          </div>
          {/* Subtitle */}
          <div className="w-full sm:w-fit px-2 sm:px-4 mt-2 mb-8 text-center">
            <div className="font-dosis text-primaryGray text-lg sm:text-xl lg:text-3xl font-light">
              AI-Powered User Behavior Analysis and Optimization Platform
            </div>
          </div>
          {/* Divider */}
          <div className="w-3/4 sm:w-1/2 lg:w-1/6 my-4">
            <hr className="border-t-2 border-primaryGray rounded-md opacity-10" />
          </div>
          {/* Buttons */}
          <div className="w-full sm:w-fit mt-6 lg:mt-4">
            <div className="w-full flex  flex-row items-center justify-center gap-4 sm:gap-5">
              <Link
                href="/sign-up"
                className="text-base sm:text-lg lg:text-1-5xl text-primary font-semibold font-dosis tracking-wider px-6 py-3 border-2 border-primary rounded-md hover:border-secondary hover:text-secondary transform transition-transform scale-90 hover:scale-95 hover:shadow-md"
              >
                Get Started Free
              </Link>
              <Link
                href="/analytics?id=TNAKLYTP"
                className="text-base sm:text-lg lg:text-1-5xl text-white font-semibold font-dosis tracking-wider px-6 py-3 border-2 border-primary bg-primary rounded-md hover:bg-secondary hover:border-secondary transform transition-transform scale-90 hover:scale-95 hover:shadow-md"
              >
                Live Demo
              </Link>
            </div>
          </div>
        </div>
      </SlideUpAnimation>
    </div>
  )
}

export default header;
