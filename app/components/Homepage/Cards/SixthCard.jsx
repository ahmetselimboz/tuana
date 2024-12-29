import Image from 'next/image'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const SixthCard = () => {
    return (
        <div className='relative rounded-2xl shadow-xl border-4 border-primary w-full lg:h-full lg:min-h-[460px] min-h-[600px] bg-primary/5  flex flex-col justify-center p-4'>
            <div className='w-full h-auto flex items-center justify-center p-12 overflow-hidden'>
                <div className='lg:w-2/6 w-5/6 h-full flex items-center justify-center'>
                    <Image src="/tuana_medium_logo.png" alt="tuana_medium_logo" className="w-full " width="800" height="800" priority />
                </div>
            </div>
            <div className='w-full h-auto items-center justify-center px-8 flex flex-col lg:text-justify text-center'>
                <div className='text-primaryGray font-semibold lg:text-5xl text-xl mb-5'>
                    <div className='text-primary inline-block'>Tuana</div> is your missing piece!
                </div>
                <div className='text-primaryGray font-base lg:text-1-5xl text-base text-center lg:w-2/3 '>
                    With Tuana, you’ll uncover exactly how users interact with your platform—and get the insights you need to make decisions with confidence
                </div>
            </div>
            <div className='absolute left-0 bottom-4 w-full h-auto flex items-center justify-center px-8  '>
                <IoIosArrowDown className='text-3xl text-primaryGray/70' />
            </div>

        </div>
    )
}

export default SixthCard