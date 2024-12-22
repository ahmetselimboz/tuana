import Link from 'next/link'
import React from 'react'
import Parallax from "@/app/components/Homepage/parallax"
import TuanalyticsSvg from "./tuanalyticsSvg"

const header = () => {
  return (
    <header className="w-full lg:h-full bg-main flex lg:flex-row flex-col  px-8">
      <div className="w-full ">
        <div className="flex flex-col lg:items-center items-start justify-center lg:h-full h-[300px] lg:mt-0 mt-10">
          <div className="lg:w-5/6 w-full font-dosis">
            <TuanalyticsSvg classn={""}></TuanalyticsSvg>
          </div>
          <div className="lg:w-5/6 w-full lg:px-4 px-0 mt-2">
            <div className="font-dosis text-primaryGray lg:text-3xl text-xl">
              AI-Powered User Behavior Analysis and Optimization Platform
            </div>
          </div>
          <div className="lg:w-5/6 w-full lg:my-4 my-2">
            <hr className="border-t-4 border-primary w-1/6  rounded-md " />
          </div>
          <div className="lg:w-5/6 w-full lg:mt-4 mt-6">
            <div className='w-full flex items-center justify-start gap-5 lg:mx-6 mx-0'>
              <Link href="/sign-up" className='lg:text-1-5xl text-lg text-primary font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md hover:border-secondary hover:text-secondary transition-all '>Get Started Free</Link>
              <Link href="/analytics?id=TNAKLYTP" className='lg:text-1-5xl text-lg  text-main font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Live Demo</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:h-full lg:my-0 my-8">
        <Parallax></Parallax>
      </div>

    </header>
  )
}

export default header