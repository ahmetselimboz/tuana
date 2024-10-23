'use client' // Bu satır, bileşenin sadece istemci tarafında render edilmesi gerektiğini belirtir.

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='w-full h-full flex flex-col items-center justify-center py-8'>
      <div className='lg:w-auto lg:h-full w-5/6 h-auto mt-26 overflow-hidden'>
        <Image src="/error.svg" alt="login" className="w-full h-full" width="1000" height="1000" priority />
      </div>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-fit text-5xl font-medium text-primary mb-2 font-dosis'>
          We're sorry!
        </div>
        <div className='w-fit lg:text-2xl text-base font-semilight text-primaryGray mb-6 font-dosis lg:px-0 px-4 text-center flex items-center'>
          Something went wrong! Please try again later <div className='pl-1 pb-2 h-fit'>👉👈</div>
        </div>
        <Link href="/" className='lg:text-xl text-lg  text-main font-medium font-dosis tracking-wider px-16 py-2 border-2 font-dosis border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Return Home</Link>

      </div>
    </div>
  )
}