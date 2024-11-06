import Image from 'next/image'
import React from 'react'

const SecondCard = () => {
    return (
        <div className='rounded-2xl shadow-xl border-4 border-primary w-full lg:h-full bg-primary/5  flex lg:flex-row flex-col-reverse p-4'>
            <div className='w-full lg:w-1/2 lg:h-full items-start justify-center lg:px-8 flex flex-col'>
                <div className='text-primary font-semibold lg:text-4xl text-3xl mb-4'>
                    You start developing!
                </div>
                <div className='text-primaryGray font-medium lg:text-2xl text-xl'>
                    Everything is going perfectly…
                </div>
            </div>
            <div className='w-full lg:w-1/2 lg:h-full flex items-center justify-center lg:p-12 overflow-hidden'>
                <div className='w-full h-full lg:mb-20 mb-8'>
                    <Image src="/cards/SecondCard.svg" alt="SecondCard" className="w-full " width="800" height="800" priority />
                </div>
            </div>
        </div>
    )
}

export default SecondCard