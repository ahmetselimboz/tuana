import Link from 'next/link'
import React from 'react'
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { LuDot } from 'react-icons/lu'
import LanguageDropdown from './languagedropdown'

const footer = () => {
    return (
        <div className='w-full lg:h-[600px] h-fit flex flex-col justify-between border-t-8 border-primary mt-8 bg-main'>

            <div className="w-full h-full flex lg:flex-row flex-col">
                <div className='lg:w-2/6 w-full h-full flex flex-col items-center justify-start'>
                    <div className='w-full  flex flex-col items-center mt-12 mb-6 px-4'>
                        <img src="/wer.svg" alt="" className='w-fit h-[80px]' />
                        <div className="font-dosis text-primaryGray text-xl ">
                            AI-based user behavior analysis platform
                        </div>
                    </div>
                    <div className='w-full  flex items-center justify-evenly px-4'>
                        <Link href="/" target='_blank' className='w-[50px] h-[50px] cursor-pointer rounded-full border-2 bg-main hover:bg-primary border-stone-900 hover:border-primaryGray text-primaryGray  hover:text-main transition-all flex items-center justify-center'>
                            <FaInstagram className=' text-2xl' />
                        </Link>
                        <Link href="/" target='_blank' className='w-[50px] h-[50px] cursor-pointer rounded-full border-2 bg-main hover:bg-primary border-stone-900 hover:border-primaryGray text-primaryGray hover:text-main transition-all flex items-center justify-center'>
                            <FaXTwitter className=' text-2xl' />
                        </Link>
                        <Link href="/" target='_blank' className='w-[50px] h-[50px] cursor-pointer rounded-full border-2 bg-main hover:bg-primary border-stone-900 hover:border-primaryGray text-primaryGray hover:text-main transition-all flex items-center justify-center'>
                            <FaLinkedinIn className=' text-2xl' />
                        </Link>
                        <Link href="/" target='_blank' className='w-[50px] h-[50px] cursor-pointer rounded-full border-2 bg-main hover:bg-primary border-stone-900 hover:border-primaryGray text-primaryGray hover:text-main transition-all flex items-center justify-center'>
                            <FaYoutube className=' text-2xl' />
                        </Link>

                    </div>

                </div>
                <hr className='w-5/6 lg:hidden mx-auto border-b-2 border-secondary/20 mt-12 mb-8' />

                <div className='lg:w-4/6 w-full h-full flex lg:flex-col flex-col-reverse'>
                    <div className='w-full lg:h-5/6 flex  h-[400px]'>
                        <div className='w-full lg:h-[400px] '></div>
                    </div>
                    <div className='w-full h-1/6 flex items-center  lg:flex-row flex-col px-8 lg:mb-0 mb-6'>
                        <div className='lg:w-1/2 w-full h-full flex flex-col items-center justify-center lg:mb-0 mb-4'>
                            <div className='text-stone-900 font-dosis font-medium text-xl'>Your analytical data in your pocket! </div>
                            <div className='text-stone-900 font-dosis font-semibold text-3xl'>Download Now!</div>
                        </div>
                        <div className='lg:w-1/2 w-full h-full flex items-center justify-center gap-2'>
                            <Link href="/" target='_blank'>
                                <img src="/GooglePlay.png" alt="" className='w-fit h-auto' />
                            </Link>
                            <Link href="/"  target='_blank'>
                                <img src="/AppStore.png" alt="" className='w-fit h-auto' />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full lg:h-[80px] h-full bg-primaryGray flex items-center lg:flex-row flex-col justify-between lg:px-6 lg:py-0 py-4'>
                <div className='lg:w-2/6 w-full h-full flex items-center lg:justify-start justify-center'>
                    <div className='text-main font-dosis'>
                        &copy;{new Date().getFullYear()} Tuanalytics is a product of <Link href="https://linatechnologies.com" target='_blank' className='font-medium hover:underline transition-all'>Lina Technologies</Link>.
                    </div>

                </div>
                <div className='lg:w-4/6 w-full flex items-center lg:flex-row flex-col-reverse lg:mt-0 mt-3'>

                    <div className='text-main/70 font-dosis text-sm lg:w-3/4 w-full px-4 flex items-center justify-center gap-1'>
                        <Link href="/" className='hover:underline transition-all text-center'>Privacy Policy</Link>
                        <span className=""><LuDot /></span>
                        <Link href="/" className='hover:underline transition-all text-center'>Terms of Use</Link>
                        <span className=""><LuDot /></span>
                        <Link href="/" className='hover:underline transition-all text-center'>Human Resources Policy</Link>
                        <span className=""><LuDot /></span>
                        <Link href="/" className='hover:underline transition-all text-center'>Environmental and Social Policy</Link>
                    </div>
                    <div className='lg:w-1/4 w-full h-full flex items-center justify-center lg:mb-0 mb-3'>
                     <LanguageDropdown></LanguageDropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer