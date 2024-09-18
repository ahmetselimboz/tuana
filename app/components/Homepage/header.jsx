import Link from 'next/link'
import React from 'react'
import Parallax from "@/app/components/Homepage/parallax"
import Image from 'next/image'

const header = () => {
  return (
    <header className="w-full lg:h-full bg-main flex lg:flex-row flex-col  px-8">
      <div className="w-full ">
        <div className="flex flex-col lg:items-center items-start justify-center lg:h-full h-[300px] lg:mt-0 mt-10">
          <div className="lg:w-5/6 w-full font-dosis">

            <svg id="Grup_2" data-name="Grup 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.8 131.95">
              <defs>
                <style>

                </style>
              </defs>
              <g id="Dikdörtgen_1" data-name="Dikdörtgen 1">
                <rect className="cls-2" x="1.95" y="2.56" width="247.05" height="120.74" rx="8.88" ry="8.88" />
              </g>
              <g id="tuana">
                <text className="cls-4" transform="translate(13.26 107.34)">
                  <tspan x="0" y="0">tuana</tspan>
                </text>
              </g>
              <g id="lytics">
                <text className="cls-3" transform="translate(249.46 107.29)">
                  <tspan x="0" y="0">lytics</tspan>
                </text>
              </g>
              <g id="Grup_1" data-name="Grup 1">
                <g id="Elips_1" data-name="Elips 1">
                  <ellipse className="cls-5" cx="24.62" cy="20.76" rx="5.97" ry="6.09" />
                </g>
                <g id="Elips_1-2" data-name="Elips 1">
                  <path className="cls-5" d="M88.66,39.04c-3.3,0-5.97,2.73-5.97,6.09s2.67,6.09,5.97,6.09,5.97-2.73,5.97-6.09-2.67-6.09-5.97-6.09Z" />
                </g>
                <g id="Elips_1-3" data-name="Elips 1">
                  <ellipse className="cls-5" cx="47.14" cy="36.71" rx="5.97" ry="6.09" />
                </g>
                <g id="Elips_1-4" data-name="Elips 1">
                  <ellipse className="cls-5" cx="71.87" cy="26.85" rx="5.97" ry="6.09" />
                </g>
                <g id="_Çizgi_1" data-name="Çizgi 1">
                  <polygon className="cls-1" points="24.65 20.4 24.62 20.44 47.12 36.71 47.14 36.68 24.65 20.4" />
                  <polygon className="cls-6" points="24.65 20.4 24.62 20.44 47.12 36.71 47.14 36.68 24.65 20.4" />
                </g>
                <g id="_Çizgi_1-2" data-name="Çizgi 1">
                  <polygon className="cls-1" points="72.6 25.99 47.05 36.85 47.06 36.89 72.62 26.03 72.6 25.99" />
                  <polygon className="cls-6" points="72.6 25.99 47.05 36.85 47.06 36.89 72.62 26.03 72.6 25.99" />
                </g>
                <g id="_Çizgi_1-3" data-name="Çizgi 1">
                  <polygon className="cls-1" points="70.83 25.48 70.79 25.51 90.6 47.01 90.63 46.98 70.83 25.48" />
                  <polygon className="cls-6" points="70.83 25.48 70.79 25.51 90.6 47.01 90.63 46.98 70.83 25.48" />
                </g>
              </g>
            </svg>
          </div>
          <div className="lg:w-5/6 w-full lg:px-4 px-0 mt-2">
            <div className="font-dosis text-primaryGray lg:text-3xl text-xl">
              AI-based user behavior analysis platform
            </div>
          </div>
          <div className="lg:w-5/6 w-full lg:my-4 my-2">
            <hr className="border-t-4 border-primary w-1/6  rounded-md " />
          </div>
          <div className="lg:w-5/6 w-full lg:mt-4 mt-6">
            <div className='w-full flex items-center justify-start gap-5 lg:mx-6 mx-0'>
              <Link href="/" className='lg:text-1-5xl text-lg text-primary font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md hover:border-secondary hover:text-secondary transition-all '>Get Started Free</Link>
              <Link href="/analytics" className='lg:text-1-5xl text-lg  text-main font-semibold font-dosis tracking-wider px-4 py-2 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Live Demo</Link>
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