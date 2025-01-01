"use client"
import useWidth from '@/app/hooks/useWidth';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '@/app/components/Animation/dropdown'
import DateDropdown from '@/app/components/Date/datedropdown'
import Menu from "@/app/components/Analytics/menu"
import { HiMiniBars3 } from 'react-icons/hi2';
import CustomDatePicker from '../Date/customdatepicker';
import ProjectList from './Auth-Navbar/projectlist';
import UserBar from './Auth-Navbar/userbar';
import { usePathname } from 'next/navigation';

const authenticatedNavbar = () => {
  const pathname = usePathname();
    const [openAppBar, setOpenAppBar] = useState(false)
    const [openUserBar, setOpenUserBar] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const authNavbar = useRef()

    const { width } = useWidth()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const navbar = authNavbar.current

            const handleScroll = () => {
                if (width >= 1024) {
                    if (window.scrollY > 400) {

                        setIsVisible(true);

                    } else {
                        setIsVisible(false);
                    }
                } else {
                    if (window.scrollY > 1070) {

                        navbar.style.marginTop = '-51px';
                        setIsVisible(true);
                        setOpenSidebar(false);
                    } else {
                        navbar.style.marginTop = '0px';
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
    }, [width]);




    if (width <= 1024) {
        return (
            <div id="auth-navbar" ref={authNavbar} className='w-full flex flex-col fixed top-0 left-0 z-20 bg-main py-4'>

                <div className='flex items-center justify-between relative w-full px-2'>
                    <div className='w-fit flex items-center justify-center ml-2'>
                        <HiMiniBars3 className='text-stone-900 text-2xl ' onClick={() => { setOpenSidebar(!openSidebar); setOpenAppBar(false); setOpenUserBar(false) }} />
                        <Dropdown isOpen={openSidebar}>
                            <div className={`min-w-[250px] h-fit absolute z-40 border border-stone-900/20 top-12 -left-5 rounded-md shadow-xl bg-main`}>
                                <div className='w-full flex flex-col gap-2 pb-2'>
                                    <Menu></Menu>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                    <ProjectList setOpenAppBar={setOpenAppBar} openAppBar={openAppBar} setOpenUserBar={setOpenUserBar} setOpenSidebar={setOpenSidebar}></ProjectList>
                    <UserBar setOpenUserBar={setOpenUserBar} setOpenSidebar={setOpenSidebar} setOpenAppBar={setOpenAppBar} openUserBar={openUserBar}></UserBar>
                </div>

                {isVisible && (
                    <div className='w-full flex items-center justify-end mt-2 relative -z-20'>
                        <div className="h-auto w-full px-11 flex items-center justify-between">

                            <CustomDatePicker></CustomDatePicker>
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
                            <Link href="/"> <img src="/tuana_medium_logo.png" alt="tuana_medium_logo.png" className='w-[90%]' /></Link>
                        </div>
                        <div className='w-1/4'>

                        </div>
                    </div>
                    <ProjectList setOpenAppBar={setOpenAppBar} openAppBar={openAppBar}></ProjectList>
                    <UserBar setOpenUserBar={setOpenUserBar} setOpenSidebar={setOpenSidebar} setOpenAppBar={setOpenAppBar} openUserBar={openUserBar}></UserBar>

                </div>
            </div>
            {isVisible && pathname == "/analytics" && (
                <div className='w-full '>
                    <div className="h-auto w-fit flex items-center justify-center px-4 fixed right-[18rem] top-5 z-20 ">

                        <div className='w-[157px] border border-stone-900/20 rounded-md'>

                            <DateDropdown navbar={true}></DateDropdown>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default authenticatedNavbar