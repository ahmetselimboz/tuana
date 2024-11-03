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
        <ScaleUpOnScroll className='w-fit flex items-start justify-center mb-8'>
          <div className='text-primaryGray text-7xl mr-3'>
            Meet
          </div>
          <div className='text-primary font-medium text-7xl'>
            Tuana!
          </div>
        </ScaleUpOnScroll>
        <div className='w-3/6 flex items-start justify-center'>
          <SlideInFromLeft className='text-primaryGray font-light text-2xl text-center'>
          Tuana helps you understand your users’ behaviors, providing precise insights with AI support. Discover the steps to improve user experience and take your business to the next level!

          </SlideInFromLeft>
        </div>
      </div>
      <SlideUpOnScroll className='w-5/6'>
      
        <Image src="/pc_and_phone.png" alt="pc_and_phone" className="w-full drop-shadow-2xl" width="1200" height="1200" priority />
      </SlideUpOnScroll>
    </div>
  )
}

export default PCAndPhone