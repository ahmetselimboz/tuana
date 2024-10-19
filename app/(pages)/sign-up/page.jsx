"use client"

import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <div className='w-full bg-main h-full flex items-center'>
            <div className='relative w-1/2 h-full lg:flex hidden flex-col items-center justify-start px-12 p-8'>
                <div className='w-full h-[600px]  mt-26 overflow-hidden'>
                    <Image src="/signup2.svg" alt="login" className="w-full " width="800" height="800" />
                </div>
                <div className='w-full mb-4 absolute bottom-8 right-0 z-10 mt-16 bg-gradient-to-b from-transparent via-main to-main flex items-center'>
                    <div className=' text-4xl text-primaryGray px-12 w-fit font-light mt-16 text-center'>
                        Join Tuana and improve your site by understanding your users better!
                    </div>
                </div>

            </div>
            <div className='border border-r-black/10 h-5/6 lg:block hidden'></div>
            <div className='lg:w-1/2 w-full h-full flex items-center justify-center lg:px-0 px-4'>
                <div className='relative lg:w-1/2 w-full rounded-md shadow-xl border border-stone-900/20 flex flex-col px-4 pt-12 pb-2'>
                    <div className='w-full flex flex-col items-center mb-5'>
                        <div className='w-fit text-4xl text-primary font-semibold mb-2'>
                            Join Tuana!
                            <hr className="border-b-2 border-primary w-1/3" />
                        </div>
                        <div className='text-primaryGray px-4 text-center text-base'>
                            Create your account and explore Tuana's AI-powered analytics!
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center mb-6'>
                        <div className=' w-full flex flex-col items-start mb-2 '>
                            <label htmlFor="email" className='ml-2 font-light text-primaryGray'>Email</label>
                            <input type="email" placeholder='Enter email' id='email' className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' required />
                        </div>
                        <div className='relative w-full flex flex-col items-start mb-2'>
                            <label htmlFor="password" className='ml-2 font-light text-primaryGray'>Password</label>
                            <input type={isPasswordVisible ? "text" : "password"} placeholder='Enter password' id='password' className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' required />
                            <button
                                className="absolute h-auto bottom-2 right-0 flex items-center px-3 text-gray-600"
                                onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}

                            </button>
                        </div>
                        <div className='relative w-full flex flex-col items-start mb-2'>
                            <label htmlFor="repassword" className='ml-2 font-light text-primaryGray'>Re-Password</label>
                            <input type={isPasswordVisible ? "text" : "password"} placeholder='Enter password again' id='repassword' className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' required />
                            <button
                                className="absolute h-auto bottom-2 right-0 flex items-center px-3 text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}

                            </button>
                        </div>

                    </div>
                    <div className='w-full flex flex-col items-center mb-4'>
                        <button className='lg:text-lg text-lg  text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Sign up</button>
                    </div>
                    <div className='flex flex-col items-center mb-4'>
                        <div className=' text-lg  mb-1 text-primaryGray '>
                            or sign up with
                        </div>
                        <div className='flex flex-row items-center justify-evenly'>
                            <div className='p-2 rounded-md shadow-xl border border-stone-900/20 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all'>
                                <FcGoogle className='text-2xl' />
                            </div>
                        </div>
                    </div>
                    {/* <div className='w-full flex flex-col items-center mb-6'>
                        <Link href="/forgot-password" className=' text-primaryGray hover:text-slate-900 transition-all'>Forgot Password?</Link>
                    </div> */}
                    <div className='w-full flex flex-col items-center mb-4 '>
                        <div className='font-light mb-1 text-primaryGray '>
                            By signing up you agree to the
                            <Link href="/terms-of-service" className='ml-1  hover:text-primary font-medium transition-all hover:underline'>Terms of Service</Link>

                        </div>
                    </div>
                </div>
                <div className='absolute top-0 lg:right-5 right-0 mr-2 w-fit flex lg:flex-row flex-col  lg:items-center items-end mt-2'>
                    <div className='text-primaryGray'>
                        Have an account?
                    </div>
                    <Link href="/login" className='ml-2 lg:text-base lg:mt-0 mt-1 text-lg text-primary font-semibold font-dosis tracking-wider px-4 py-1 border-2 border-primary rounded-md hover:border-secondary hover:text-secondary transition-all '>
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

export default Signup