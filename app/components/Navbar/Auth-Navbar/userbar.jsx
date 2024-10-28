import useWidth from '@/app/hooks/useWidth'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import Dropdown from '../../Animation/dropdown'
import Link from 'next/link'
import { IoSettingsOutline } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import { RxCaretDown } from 'react-icons/rx'
import { useToast } from '@/hooks/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useAxios } from '@/app/hooks/useAxios'
import { ToastAction } from '@/components/ui/toast'

const UserBar = ({ setOpenUserBar, setOpenSidebar, setOpenAppBar, openUserBar }) => {

    const { width } = useWidth()
    const { toast } = useToast()
    const router = useRouter()
    const dispatch = useDispatch()
    const params = useSearchParams()
    const id = params.get("id")
    const [userInfo, setUserInfo]=useState("")

    const { loading: loading, res: res, error: error, sendRequest: sendRequest } = useAxios();
    const { loading: loading2, res: res2, error: error2, sendRequest: sendRequest2 } = useAxios();

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

        if (error !== null) {

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }

        if (res !== null) {

            toast({
                variant: "default",
                title: "Success",
                description: res?.message,
            })

            dispatch(setUser({}))
            router.push('/')
        }

    }, [res, error])

    const handleRequest2 = async () => {
        try {
            await sendRequest2({
                method: "GET",
                url: `/api/user/get-user`,
            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };


    useEffect(() => {

        if (error2 !== null) {
       
        }

        if (res2 !== null) {
        
            setUserInfo(res2?.user?.name)

        }

    }, [res2, error2])

    useEffect(() => {
        if (id !== "TNAKLYTP") {
            handleRequest2()
        }else{
            setUserInfo("Tuana")
        }
    }, [])

    const itemList = [
        { icon: <FaUser />, title: "Profile", slug: "/profile" },
        { icon: <IoSettingsOutline />, title: "Settings", slug: "/settings" },
    ]


    if (id == "TNAKLYTP") {
        if (width <= 1024) {
            return <div className='w-fit flex items-center justify-end '></div>
        }

        return <div className='w-1/3 flex items-center justify-end relative'></div>
    }

    if (width <= 1024) {
        return (
            <div className='w-fit flex items-center justify-end '>
                <div onClick={() => { setOpenUserBar(!openUserBar); setOpenSidebar(false); setOpenAppBar(false) }} className={`w-[40px] h-[40px] flex flex-col items-center justify-center gap-1 cursor-pointer tracking-wider text-primary border-b-2 border-transparent ${openUserBar ? "bg-black/10" : ""} transition-all p-2 rounded-md`}>
                    <FaUser className='flex items-center justify-center gap-1  h-[25px]' />
                </div>
                <Dropdown isOpen={openUserBar}>
                    <div className={`min-w-44 h-fit absolute -z-10 border border-stone-900/20 top-12 right-0 rounded-md shadow-xl bg-main`}>
                        <div className='w-full '>
                            {
                                itemList.map((il, index) => (
                                    <Link href={il.slug} key={index} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-4`}>
                                        <div className='text-xl text-primary'>{il.icon}</div>
                                        <div className='text-lg font-dosis'>{il.title}</div>
                                    </Link>
                                ))
                            }

                            <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' />
                            <div onClick={() => { handleRequest() }} className={`flex items-center justify-center gap-3 py-3 hover:underline transition-all `}>
                                <div className='text-xl text-primary'><FiLogOut /></div>
                                <div className='text-lg font-dosis'>Log Out</div>
                            </div>
                        </div>
                    </div>
                </Dropdown>
            </div>
        )


    }

    return (
        <div className='w-1/3 flex items-center justify-end relative'>


            <div className='w-fit flex flex-col items-center gap-1 cursor-pointer tracking-wider text-primaryGray border-b-2 border-transparent hover:border-b-2 hover:border-primaryGray transition'>
                <div onClick={() => { setOpenUserBar(!openUserBar) }} className='w-fit flex items-center justify-center gap-1 pl-2 h-[25px]'>
                    <h6 className='font-dosis font-semibold text-1-5xl  '>
                        {userInfo}
                    </h6>
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
                        <div onClick={() => { handleRequest() }} className={`flex items-center justify-center cursor-pointer gap-3 py-3 hover:underline transition-all `}>
                            <div className='text-2xl text-primary'><FiLogOut /></div>
                            <div className='text-xl font-dosis'>Log Out</div>
                        </div>
                    </div>
                </div>
            </Dropdown>

        </div>
    )
}

export default UserBar