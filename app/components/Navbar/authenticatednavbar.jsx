"use client"
import useWidth from '@/app/hooks/useWidth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoMdPhonePortrait } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { RxCaretDown } from 'react-icons/rx'
import { SiCodeforces } from 'react-icons/si'
import { TbWorld } from 'react-icons/tb'
import Dropdown from '@/app/components/Animation/dropdown'
import DateDropdown from '@/app/components/Animation/datedropdown'
import Menu from "@/app/components/Analytics/menu"
import { HiMiniBars3 } from 'react-icons/hi2';
import CustomDatePicker from '../Charts/customdatepicker';

const authenticatedNavbar = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const [openAppBar, setOpenAppBar] = useState(false)
    const [openUserBar, setOpenUserBar] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    const { width } = useWidth()

    const projectList = [
        { type: "web", title: "www.tuanalytics.com", siteId: "TNAKLYTP" },
        { type: "mobile", title: "TuanalyticsApp", siteId: "NBUKJLSX" },
    ]

    const itemList = [
        { icon: <FaUser />, title: "Profile", slug: "/profile" },
        { icon: <IoSettingsOutline />, title: "Settings", slug: "/settings" },
    ]

    useEffect(() => {
        if (typeof window !== 'undefined') {  // Tarayıcı ortamında olup olmadığını kontrol et
            const handleScroll = () => {
                if (width >= 1024) {
                    if (window.scrollY > 400) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                } else {
                    if (window.scrollY > 1070) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                }
            };

            window.addEventListener("scroll", handleScroll);

            // Cleanup function
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [width]);  // 'width' bağımlı olduğu için, değiştiğinde effect tekrar çalışır




    if (width <= 1024) {
        return (
            <div className='w-full flex flex-col fixed z-20 bg-main py-4'>
                <div className='w-full  px-2   '>
                    <div className='flex items-center justify-between w-full'>
                        <div className='w-fit flex items-center  relative'>
                            <HiMiniBars3 className='text-stone-900 text-2xl pl-2 w-fit' onClick={() => { setOpenSidebar(!openSidebar); setOpenAppBar(false); setOpenUserBar(false) }} />
                            <Dropdown isOpen={openSidebar}>
                                <div className={`min-w-[250px] h-fit absolute z-40 border border-stone-900/20 top-12 -left-5 rounded-md shadow-xl bg-main`}>
                                    <div className='w-full flex flex-col  px-6 py-8 gap-2'>
                                        <Menu></Menu>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                        <div className='w-fit flex flex-col items-center justify-center relative'>
                            <div className='w-fit flex justify-center items-center gap-3 cursor-pointer' onClick={() => { setOpenAppBar(!openAppBar); setOpenSidebar(false); setOpenUserBar(false) }}>
                                <div className='text-3xl text-primary'>
                                    <SiCodeforces />
                                </div>
                                <div className='text-1-5xl font-medium font-dosis tracking-wider text-primaryGray hover:text-stone-900 transition-all'>
                                    www.tuanalytics.com
                                </div>
                            </div>
                            <Dropdown isOpen={openAppBar} classw="flex items-center justify-center">
                                <div className={` w-[350px] h-fit absolute z-30 border border-stone-900/20 top-8 rounded-md shadow-xl bg-main`}>
                                    <div className='w-full '>
                                        {
                                            projectList.map((pl, index) => (
                                                <Link key={index} href={`?id=${pl.siteId}`} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-8`}>
                                                    <div className='text-4xl text-primary'>
                                                        {
                                                            pl.type == "web" ? (<TbWorld />) : (<IoMdPhonePortrait />)
                                                        }

                                                    </div>
                                                    <div className='text-xl font-dosis'>{pl.title}</div>
                                                </Link>
                                            ))
                                        }
                                        <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' />
                                        <Link href="/add-project" className={`flex items-center justify-center gap-3 py-3 hover:underline transition-all px-8`}>
                                            <div className='text-4xl text-primary'><CiCirclePlus /></div>
                                            <div className='text-xl font-dosis'>Add Project</div>
                                        </Link>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                        <div className='w-fit flex items-center justify-end relative'>
                            <div onClick={() => { setOpenUserBar(!openUserBar); setOpenSidebar(false); setOpenAppBar(false) }} className={`w-fit flex flex-col items-center justify-center gap-1 cursor-pointer tracking-wider text-primary border-b-2 border-transparent ${openUserBar ? "bg-black/10" : ""} transition-all p-2 rounded-md`}>
                                <FaUser className='w-fit flex items-center justify-center gap-1  h-[25px]' />
                            </div>
                            <Dropdown isOpen={openUserBar}>
                                <div className={`min-w-44 h-fit absolute -z-10 border border-stone-900/20 top-12 right-0 rounded-md shadow-xl bg-main`}>
                                    <div className='w-full '>
                                        {
                                            itemList.map((il, index) => (
                                                <Link href={il.slug} key={index} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-4`}>
                                                    <div className='text-2xl text-primary'>{il.icon}</div>
                                                    <div className='text-xl font-dosis'>{il.title}</div>
                                                </Link>
                                            ))
                                        }

                                        <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' />
                                        <Link href="/" className={`flex items-center justify-center gap-3 py-3 hover:underline transition-all `}>
                                            <div className='text-2xl text-primary'><FiLogOut /></div>
                                            <div className='text-xl font-dosis'>Log Out</div>
                                        </Link>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                {isVisible && (
                    <div className='w-full flex items-center justify-end mt-2 relative -z-20'>
                        <div className="h-auto w-full px-11 flex items-center justify-between">
                            {/* <DateDropdown selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedDropdown={setSelectedDropdown} navbar={true}></DateDropdown> */}
                            <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDropdown={selectedDropdown} setSelectedDropdown={setSelectedDropdown}></CustomDatePicker>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='w-full relative'>
            <div className='w-full bg-main px-8 py-4 fixed z-20'>
                <div className='flex w-full'>
                    <div className='w-1/3 flex items-center justify-around'>
                        <div className='w-1/4'>
                            <Link href="/"> <img src="/tuana_medium_logo.png" alt="" className='w-[90%]' /></Link>
                        </div>
                        <div className='w-1/4'>

                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col items-center justify-center relative'>
                        <div className='w-fit flex justify-center items-center gap-3 cursor-pointer' onClick={() => { setOpenAppBar(!openAppBar) }}>
                            <div className='text-3xl text-primary'>
                                <SiCodeforces />
                            </div>
                            <div className='text-1-5xl font-medium font-dosis tracking-wider text-primaryGray hover:text-stone-900 transition-all'>
                                www.tuanalytics.com
                            </div>
                        </div>
                        <Dropdown isOpen={openAppBar} classw="flex items-center justify-center">
                            <div className={` w-[350px] h-fit absolute border border-stone-900/20 top-10 rounded-md shadow-xl bg-main`}>
                                <div className='w-full '>
                                    {
                                        projectList.map((pl, index) => (
                                            <Link key={index} href={`?id=${pl.siteId}`} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-8`}>

                                                <div className='text-4xl text-primary'>
                                                    {
                                                        pl.type == "web" ? (<TbWorld />) : (<IoMdPhonePortrait />)
                                                    }

                                                </div>
                                                <div className='text-xl font-dosis'>{pl.title}</div>
                                            </Link>
                                        ))
                                    }
                                    <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' />
                                    <Link href="/add-project" className={`flex items-center justify-center gap-3 py-3 hover:underline transition-all px-8`}>
                                        <div className='text-4xl text-primary'><CiCirclePlus /></div>
                                        <div className='text-xl font-dosis'>Add Project</div>
                                    </Link>
                                </div>
                            </div>
                        </Dropdown>
                    </div>

                    <div className='w-1/3 flex items-center justify-end relative'>


                        <div className='w-fit flex flex-col items-center gap-1 cursor-pointer tracking-wider text-primaryGray border-b-2 border-transparent hover:border-b-2 hover:border-primaryGray transition'>
                            <div onClick={() => { setOpenUserBar(!openUserBar) }} className='w-fit flex items-center justify-center gap-1 pl-2 h-[25px]'>
                                <div className='font-dosis font-semibold text-1-5xl  '>
                                    Tuana
                                </div>
                                <div className='text-4xl  '>
                                    <RxCaretDown />
                                </div>
                            </div>

                        </div>
                        <Dropdown isOpen={openUserBar}>
                            <div className={`min-w-44 h-fit absolute border border-stone-900/20 top-14 right-3.5 rounded-md shadow-xl bg-main`}>
                                <div className='w-full '>
                                    {
                                        itemList.map((il, index) => (
                                            <Link href={il.slug} key={index} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-4`}>
                                                <div className='text-2xl text-primary'>{il.icon}</div>
                                                <div className='text-xl font-dosis'>{il.title}</div>
                                            </Link>
                                        ))
                                    }

                                    <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' />
                                    <Link href="/" className={`flex items-center justify-center gap-3 py-3 hover:underline transition-all `}>
                                        <div className='text-2xl text-primary'><FiLogOut /></div>
                                        <div className='text-xl font-dosis'>Log Out</div>
                                    </Link>
                                </div>
                            </div>
                        </Dropdown>

                    </div>
                </div>
            </div>
            {isVisible && (
                <div className='w-full '>
                    <div className="h-auto w-fit flex items-center justify-center px-4 fixed right-[18rem] top-5 z-20 ">

                        <div className='w-[157px] border border-stone-900/20 rounded-md'>

                            <DateDropdown selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedDropdown={setSelectedDropdown} navbar={true}></DateDropdown>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default authenticatedNavbar