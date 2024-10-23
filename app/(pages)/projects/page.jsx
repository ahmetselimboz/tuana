"use client"

import ProfileNavbar from '@/app/components/Navbar/profileNavbar'
import React, { useEffect, useState } from 'react'
import Footer from "@/app/components/Footer/footer"
import { TbWorld } from 'react-icons/tb'
import { BsThreeDots } from "react-icons/bs";
import Link from 'next/link'
import { IoFilter } from 'react-icons/io5'
import { CiSearch, CiSettings, CiSquarePlus } from 'react-icons/ci'
import Dropdown from '@/app/components/Animation/dropdown'
import { TiPinOutline } from "react-icons/ti";
import { MdPushPin } from "react-icons/md";
import Image from 'next/image'
import useWidth from '@/app/hooks/useWidth'

const Projects = () => {

    const [adsActive, setAdsActive] = useState(false)
    const [openProjectSetting, setProjectSetting] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)

    const { width } = useWidth()

    return (
        <>
            <ProfileNavbar></ProfileNavbar>
            <div className='w-full h-auto flex items-center py-24'>
                <div className='lg:block hidden w-1/6 h-full px-4 '>
                    {
                        adsActive ? (
                            <>
                                <div className="w-full h-[600px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                                    <div className="text-main font-dosis text-2xl">Ad space</div>
                                </div>

                            </>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
                <div className='lg:w-4/6 w-full flex flex-col items-center justify-center'>
                    {/* <div className='h-[400px] w-auto'>
                    <Image src="/projects.svg" alt="login" className="w-full h-full" width="1000" height="1000" priority />
                    </div> */}
                    {
                        width >= 1024 ? (<></>) : (
                            <div className="text-primary font-dosis lg:text-5xl text-4xl px-2 font-medium  ">
                                My Projects
                                <hr className="border-b-2 border-primary w-2/5" />
                            </div>
                        )
                    }
                    <div className='w-5/6 h-auto flex flex-row items-center lg:justify-between justify-end mt-10 mb-5'>
                        {
                            width <= 1024 ? (<></>) : (
                                <div className="text-primary font-dosis lg:text-5xl text-3xl px-2 font-medium  ">
                                    My Projects
                                    <hr className="border-b-2 border-primary w-2/5" />
                                </div>
                            )
                        }

                        <Link href="/add-project" className='w-fit h-auto  px-4 py-1 flex flex-row items-center justify-center rounded-md shadow-xl bg-primary text-main border border-primary hover:bg-secondary transition-all'>
                            <div className='flex items-center w-fit'>
                                <div className='text-3xl  text-main'>
                                    <CiSquarePlus />
                                </div>
                                <div className='lg:text-lg text-base font-medium font-dosis tracking-wider text-main  ml-2  transition-all'>
                                    Add Project
                                </div>
                            </div>

                        </Link>
                    </div>

                    <div className='border-2 border-primaryGray/20 w-5/6 rounded-full'></div>
                    <div className='w-5/6 flex flex-row items-center justify-between mt-2 '>
                        <div className='relative lg:w-[400px] w-full'>
                            <input type="text" className="font-dosis pl-8 lg:w-1/2 outline-none px-4 py-2 rounded-md  border-2 border-stone-900/20 focus:border-primary transition-all bg-main" placeholder="Search projects..." />
                            <div className='absolute top-3.5 left-3 w-fit text-primaryGray'><CiSearch /></div>
                        </div>
                        <div onClick={() => { setOpenFilter(!openFilter) }} className='relative z-10 flex items-center tracking-wider text-lg cursor-pointer text-primaryGray px-4 py-1 bg-gray-700/5 hover:bg-gray-800/10 rounded-md transition-all'>
                            <div className='mr-2 '> <IoFilter /> </div>
                            <div className=''>  Filter</div>
                            <Dropdown isOpen={openFilter}>
                                <div className={`min-w-32 h-fit absolute border border-stone-900/20 top-12 -right-4 rounded-md shadow-xl bg-main`}>
                                    <Link href="#" className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10  transition-all px-4`}>
                                        <div className='text-base font-dosis'>Type</div>
                                    </Link>
                                    <Link href="#" className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10  transition-all px-4`}>
                                        <div className='text-base font-dosis'>Date</div>
                                    </Link>
                                    <Link href="#" className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10  transition-all px-4`}>
                                        <div className='text-base font-dosis'>Status</div>

                                    </Link>

                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-col items-center my-6'>

                        <div className='relative w-5/6 h-auto mb-4 px-4 py-8 flex lg:flex-row flex-col items-center justify-between rounded-md shadow-xl border border-stone-900/20 bg-main hover:border-primary transition-all'>
                            <Link href="/analytics" className='flex items-center lg:justify-normal justify-center lg:w-4/6 w-full lg:mb-0 mb-4'>
                                <div className='text-4xl text-primary'>
                                    <TbWorld />
                                </div>
                                <div className='text-1-5xl font-medium font-dosis tracking-wider text-primaryGray  ml-2  transition-all'>
                                    tuanalytics.com
                                </div>
                            </Link>
                            <div className='relative flex items-center lg:justify-end justify-center  lg:w-2/6 w-full'>

                                <div className='text-sm font-medium font-dosis tracking-wider text-primaryGray px-2 py-1 bg-gray-700/5 hover:bg-gray-800/10 rounded-md transition-all flex items-center'>
                                    <div className='bg-green-500 w-3 h-3 rounded-full mr-1'></div>
                                    Active
                                </div>

                                <div className='text-sm font-medium font-dosis tracking-wider text-primaryGray  ml-2 px-2 py-1 bg-gray-700/5 hover:bg-gray-800/10 rounded-md transition-all'>
                                    May 14, 2024
                                </div>
                                <div onClick={() => { setProjectSetting(!openProjectSetting) }} className=' relative w-8 h-8 flex items-center justify-center cursor-pointer ml-4 text-2xl text-primaryGray hover:bg-black/5 p-1 rounded-full transition-all'>
                                    <BsThreeDots />
                                    <Dropdown isOpen={openProjectSetting}>
                                        <div className={`min-w-32 h-fit absolute border border-stone-900/20 top-10 right-0 rounded-md shadow-xl bg-main`}>

                                            {/* <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' /> */}
                                            <Link href="#" className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10  transition-all px-4`}>
                                                <div className='text-2xl text-primary'><CiSettings /></div>
                                                <div className='text-base font-dosis'>Settings</div>

                                            </Link>
                                            <Link href="#" className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-4`}>
                                                <div className='text-2xl text-primary'><TiPinOutline /></div>
                                                <div className='text-base font-dosis'>Pin</div>

                                            </Link>
                                        </div>
                                    </Dropdown>
                                </div>


                            </div>
                            <div className='absolute top-4 right-4 text-primary'>
                                <MdPushPin />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:block hidden w-1/6 h-full px-4'>
                    {
                        adsActive ? (
                            <>
                                <div className="w-full h-[600px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                                    <div className="text-main font-dosis text-2xl">Ad space</div>
                                </div>

                            </>
                        ) : (
                            <div></div>
                        )
                    }
                </div>


            </div>
            <div className="w-full h-fit flex">

                <div className="w-full h-full">
                    <Footer></Footer>
                </div>
            </div>
        </>

    )

}

export default Projects