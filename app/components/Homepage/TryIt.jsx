import Link from 'next/link'
import React from 'react'

const TryIt = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='text-primary font-medium lg:text-8xl text-4xl inline-block text-center lg:w-4/5 w-full mb-36'>
                Hey! Just give it a try <div className='mt-2'>You're gonna love it 😉</div>
            </div>
            <div className='flex items-center justify-center mb-36'>
                <Link href="/sign-up" className='w-fit py-2 rounded-full cursor-pointer transition-all px-4 hover:w-fit lg:text-xl  text-primary hover:text-main hover:bg-gradient-to-b hover:from-primary hover:to-primary shadow-lg hover:shadow-xl bg-gradient-to-b from-main to-zinc-200  border-2 border-primary flex items-center justify-center flex-row'>
                    Get Started, You'll thank me later ;)
                </Link>
            </div>
        </div>
    )
}

export default TryIt