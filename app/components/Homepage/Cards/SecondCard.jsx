import Image from 'next/image'
import React from 'react'

const SecondCard = () => {
    return (
        <div className='rounded-2xl shadow-xl border-4 border-primary w-full h-full bg-primary/5  flex flex-row p-4'>
            <div className='w-1/2 h-full items-start justify-center px-8 flex flex-col'>
                <div className='text-primary font-semibold text-4xl mb-4'>
                    You start developing!
                </div>
                <div className='text-primaryGray font-medium text-2xl'>
                    Everything is going perfectly…
                </div>
            </div>
            <div className='w-1/2 h-full flex items-center justify-center p-12 overflow-hidden'>
                <div className='w-full h-full mb-20'>
                    <Image src="/cards/SecondCard.svg" alt="SecondCard" className="w-full " width="800" height="800" priority />
                </div>
            </div>
        </div>
    )
}

export default SecondCard