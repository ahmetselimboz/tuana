import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmailConfirmed = () => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center py-8'>
            <div className='w-auto h-full  mt-26 overflow-hidden'>
                <Image src="/emailconfirmed.svg" alt="login" className="w-full h-full" width="1000" height="1000" />
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-fit text-5xl font-medium text-primary mb-2'>
                    Email Confirmed!
                </div>
                <div className='w*fıt text-2xl font-semilight text-primaryGray mb-6'>
                    Start exploring your analytics by logging in to Tuana.
                </div>
                <Link href="/login" className='lg:text-xl text-lg  text-main font-medium font-dosis tracking-wider px-16 py-2 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Get Started</Link>

            </div>
        </div>
    )
}

export default EmailConfirmed