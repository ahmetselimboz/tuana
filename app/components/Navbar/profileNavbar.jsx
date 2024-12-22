"use client"

import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '../Animation/dropdown'
import Link from 'next/link'
import useWidth from '@/app/hooks/useWidth'
import { HiMiniBars3 } from 'react-icons/hi2'
import { FaUser } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'
import { RxCaretDown } from 'react-icons/rx'
import { FiLogOut } from 'react-icons/fi'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useAxios } from '@/app/hooks/useAxios'
import { ToastAction } from '@/components/ui/toast'
import { setUser } from '@/lib/redux/features/userSettings/userSlice'
import UserBar from './Auth-Navbar/userbar'

const ProfileNavbar = () => {
    const [openAppBar, setOpenAppBar] = useState(false)
    const [openUserBar, setOpenUserBar] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const authNavbar = useRef()

    const { width } = useWidth()



    const { toast } = useToast()
    const router = useRouter()
    const dispatch = useDispatch()

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        try {
            await sendRequest({
                method: "POST",
                url: `/api/user/logout`
            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    useEffect(() => {


        if (res !== null) {

            if (res.code !== 200) {

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: res?.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            } else {
                toast({
                    variant: "default",
                    title: "Success",
                    description: res?.message,
                })

                dispatch(setUser({}))
                router.push('/')
            }



        }

    }, [res, error])


    const itemList = [
        { icon: <FaUser />, title: "Profile", slug: "/profile" },
        { icon: <IoSettingsOutline />, title: "Settings", slug: "/settings" },
    ]


    if (width <= 1024) {
        return (
            <div id="auth-navbar" ref={authNavbar} className='w-full flex flex-col fixed top-0 left-0 z-20 bg-main py-4'>

                <div className='flex items-end justify-between relative w-full px-2'>
                    <div className='w-[27%] flex items-center justify-center ml-2'>
                        {/* <HiMiniBars3 className='text-stone-900 text-2xl ' onClick={() => { setOpenSidebar(!openSidebar); setOpenAppBar(false); setOpenUserBar(false) }} />
                        <Dropdown isOpen={openSidebar}>
                            <div className={`min-w-[250px] h-fit absolute z-40 border border-stone-900/20 top-12 -left-5 rounded-md shadow-xl bg-main`}>
                                <div className='w-full flex flex-col  px-6 py-8 gap-2'>
                                    <Menu></Menu>
                                </div>
                            </div>
                        </Dropdown> */}
                        <Link href="/"> <img src="/tuana_medium_logo.png" alt="tuana_medium_logo.png" className='w-[90%]' /></Link>
                    </div>

                    <UserBar setOpenUserBar={setOpenUserBar} setOpenSidebar={setOpenSidebar} setOpenAppBar={setOpenAppBar} openUserBar={openUserBar}></UserBar>
                </div>

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
                    <div className='w-1/3 flex flex-col items-center justify-center relative'>

                    </div>

                    <UserBar setOpenUserBar={setOpenUserBar} setOpenSidebar={setOpenSidebar} setOpenAppBar={setOpenAppBar} openUserBar={openUserBar}></UserBar>
                </div>
            </div>

        </div>
    )
}

export default ProfileNavbar