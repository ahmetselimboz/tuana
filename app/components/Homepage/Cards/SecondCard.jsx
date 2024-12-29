import Image from 'next/image'
import React from 'react'

const SecondCard = () => {
    return (
        <div className='rounded-2xl shadow-xl border-4 border-primary w-full lg:h-full lg:min-h-[460px] min-h-[550px] bg-primary/5  flex lg:flex-row flex-col-reverse justify-center lg:p-4 py-6 px-8'>
            <div className='w-full lg:w-1/2 lg:h-full lg:items-start items-center justify-center lg:px-8 flex flex-col'>
                <div className='text-primary font-semibold lg:text-4xl text-2xl mb-4'>
                    But the results are confusing!
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/6 mb-2 flex items-start">
                    <hr className="border-t-2 border-primary rounded-md lg:w-full w-1/5" />
                </div>
                <div className='text-primaryGray font-base lg:text-1-5xl text-base'>
                Traffic is coming in, but users aren’t staying. Engagement and conversions are lower than you expected...
                </div>
            </div>
            <div className='w-full lg:w-1/2 lg:h-full flex items-center justify-center lg:p-12 overflow-hidden'>
                <div className='w-full h-full lg:mb-20 mb-8'>
                    <Image src="/cards/FourthCard.svg" alt="SecondCard" className="w-full " width="800" height="800" priority />
                </div>
            </div>
        </div>
    )
}

export default SecondCard