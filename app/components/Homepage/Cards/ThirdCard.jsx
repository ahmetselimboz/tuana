import Image from 'next/image'
import React from 'react'

const ThirdCard = () => {
    return (
        <div className='rounded-2xl shadow-xl border-4 border-primary w-full lg:h-full lg:min-h-[460px] min-h-[550px] bg-primary/5  flex lg:flex-row flex-col-reverse justify-center lg:p-4 py-6 px-8'>
            <div className='w-full lg:w-1/2 lg:h-full lg:items-start items-center justify-center lg:px-8 flex flex-col'>
                <div className='text-primary font-semibold lg:text-4xl text-2xl mb-4'>
                    You’re missing a key piece of the puzzle!
                </div>
                <div className="w-3/4 sm:w-1/2 lg:w-1/6 mb-2">
                    <hr className="border-t-2 border-primary rounded-md " />
                </div>
                <div className='text-primaryGray font-base lg:text-1-5xl text-base'>
                    What’s happening on your platform? Are users facing difficulties? What’s stopping them from taking action?
                </div>
            </div>
            <div className='w-full lg:w-1/2 lg:h-full flex items-center justify-center lg:p-12 overflow-hidden'>
                <div className='w-full h-full lg:mb-20 mb-8'>
                    <Image src="/cards/Card-9.svg" alt="ThirdCard" className="w-full " width="800" height="800" priority />
                </div>
            </div>
        </div>
    )
}

export default ThirdCard