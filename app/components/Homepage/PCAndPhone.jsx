import Image from 'next/image'
import React from 'react'
import ScaleUpOnScroll from '../Animation/ScaleUpOnScroll'
import SlideUpAnimation from '../Animation/SlideUpAnimation'
import SlideInFromLeft from '../Animation/SlideInFromLeft'
import SlideUpOnScroll from '../Animation/SlideUpOnScroll'

const PCAndPhone = () => {
  return (
    <div className='w-full h-auto py-8 px-10 flex flex-col items-center mb-12'>
      <div className='w-full flex flex-col items-center mb-10'>
        <ScaleUpOnScroll className='w-fit flex items-start justify-center lg:text-7xl text-5xl mb-8'>
          <div className='text-primaryGray  mr-3'>
            Meet
          </div>
          <div className='text-primary font-medium '>
            Tuana!
          </div>
        </ScaleUpOnScroll>
        <div className='lg:w-3/6 w-full flex items-start justify-center'>
          <SlideInFromLeft className='text-primaryGray font-light lg:text-2xl text-xl text-center'>
          Tuana helps you understand your users’ behaviors, providing precise insights with AI support. Discover the steps to improve user experience and take your business to the next level!

          </SlideInFromLeft>
        </div>
      </div>
      <SlideUpOnScroll className='lg:w-4/6 w-full'>
      
        <Image src="/Tuana_PC_And_Phone.png" alt="pc_and_phone" className="w-full drop-shadow-2xl" width="2000" height="1500" priority />
      </SlideUpOnScroll>
    </div>
  )
}

export default PCAndPhone