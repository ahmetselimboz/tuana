"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

const ForgotPassword = () => {
    return (
        <div className='w-full bg-main h-full flex items-center'>
            <div className='relative w-1/2 h-full lg:flex hidden flex-col items-center justify-start px-12 p-8'>
                <div className='w-full h-[600px]  mt-26 overflow-hidden'>
                    <Image src="/forgotpassword.svg" alt="login" className="w-full " width="800" height="800" />
                </div>
                <div className='w-full mb-4 absolute bottom-8 right-0 z-10 mt-16 bg-gradient-to-b from-transparent via-main to-main flex items-center'>
                    <div className=' text-4xl text-primaryGray px-12 w-fit font-light mt-16 text-center font-dosis'>
                        Join Tuana and improve your site by understanding your users better!
                    </div>
                </div>

            </div>
            <div className='border border-r-black/10 h-5/6 lg:block hidden'></div>
            <div className='lg:w-1/2 w-full h-full flex items-center justify-center lg:px-0 px-4'>
                <div className='relative lg:w-1/2 w-full rounded-md shadow-xl border border-stone-900/20 flex flex-col px-4 pt-12 pb-2'>
                    <div className='w-full flex flex-col items-center mb-5'>
                        <div className='w-fit text-4xl text-primary font-semibold mb-2 font-dosis'>
                            Forgot Your Password?
                            <hr className="border-b-2 border-primary w-1/3" />
                        </div>
                        <div className='text-primaryGray px-4 text-center text-base font-dosis'>
                            Keep your data safe and reset your password easily with Tuana!
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center mb-6'>
                        <div className=' w-full flex flex-col items-start mb-2 '>
                            <label htmlFor="email" className='ml-2 font-light text-primaryGray font-dosis'>Email</label>
                            <input type="email" placeholder='Enter email' id='email' className='w-full font-dosis rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' required />
                        </div>


                    </div>
                    <div className='w-full flex flex-col items-center mb-4'>
                        <button className='lg:text-lg text-lg  text-main font-medium font-dosis tracking-wider px-16 py-1 font-dosis border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Reset Password</button>
                    </div>
                    {/* <div className='flex flex-col items-center mb-4'>
                        <div className=' text-lg  mb-1 text-primaryGray '>
                            or sign up with
                        </div>
                        <div className='flex flex-row items-center justify-evenly'>
                            <div className='p-2 rounded-md shadow-xl border border-stone-900/20 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all'>
                                <FcGoogle className='text-2xl' />
                            </div>
                        </div>
                    </div> */}
                    {/* <div className='w-full flex flex-col items-center mb-6'>
                        <Link href="/forgot-password" className=' text-primaryGray hover:text-slate-900 transition-all'>Forgot Password?</Link>
                    </div> */}
                    {/* <div className='w-full flex flex-col items-center mb-4 '>
                        <div className='font-light mb-1 text-primaryGray '>
                            By signing up you agree to the
                            <Link href="/terms-of-service" className='ml-1  hover:text-primary font-medium transition-all hover:underline'>Terms of Service</Link>

                        </div>
                    </div> */}
                </div>
                <div className='absolute top-0 lg:right-5 right-0 mr-2 w-fit flex lg:flex-row flex-col lg:items-center items-end mt-2'>
                    <div className='text-primaryGray font-dosis'>
                        Remember your password?
                    </div>
                    <Link href="/login" className='ml-2 lg:text-base text-lg lg:mt-0 mt-1 text-primary font-semibold font-dosis tracking-wider px-4 font-dosis py-1 border-2 border-primary rounded-md hover:border-secondary hover:text-secondary transition-all '>
                        Login
                    </Link>
                </div>
                <div className='absolute top-0 left-8  w-fit flex flex-row items-center lg:mt-1 mt-2'>
                    <div className='w-full'>
                        <Link href="/"> <img src="/tuana_medium_logo.png" alt="tuana_medium_logo.png" className='h-[45px]' /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword