import { useAxios } from '@/app/hooks/useAxios'
import useWidth from '@/app/hooks/useWidth'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { IoMdPhonePortrait } from 'react-icons/io'
import { SiCodeforces } from 'react-icons/si'
import { TbWorld } from 'react-icons/tb'
import Dropdown from '../../Animation/dropdown'
import Link from 'next/link'

const ProjectList = ({ setOpenAppBar, openAppBar, setOpenUserBar, setOpenSidebar }) => {

    const [appList, setAppList] = useState([])
    const [currentApp, setCurrentApp] = useState([])
    const { width } = useWidth()
    const { toast } = useToast()
    const params = useSearchParams()
    const id = params.get("id")

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async (e) => {
        try {

            await sendRequest({
                method: "GET",
                url: `/api/apps/get-project-list`,

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
            }else{
                setAppList(res.list.filter((item) => item.appId.appId !== id))
                setCurrentApp(res.list.filter((item) => item.appId.appId === id))
            }


        }


    }, [res, error])

    useEffect(() => {
        handleRequest()
    }, [])



    if (id == "TNAKLYTP") {
        if (width <= 1024) {
            return <div className=' w-fit  flex flex-col items-center justify-center '></div>
        }

        return <div className='w-1/3 flex flex-col items-center justify-center relative'></div>
    }


    if (width <= 1024) {
        return (
            <div className=' w-fit  flex flex-col items-center justify-center '>
                <div className='w-fit flex justify-center items-center gap-3 cursor-pointer' onClick={() => { setOpenAppBar(!openAppBar); setOpenSidebar(false); setOpenUserBar(false) }}>
                    <div className='text-3xl text-primary'>
                        <SiCodeforces />
                    </div>
                    <div className='text-1-5xl font-medium font-dosis tracking-wider text-primaryGray hover:text-stone-900 transition-all'>
                        {currentApp[0]?.appId?.project_name}
                    </div>
                </div>
                <Dropdown isOpen={openAppBar} classw="flex items-center justify-center">
                    <div className={`  h-fit absolute z-30 border border-stone-900/20 top-8 rounded-md shadow-xl bg-main`}>
                        <div className='w-full '>
                            {
                                appList?.map((pl, index) => (
                                    <Link key={index} href={`?id=${pl?.appId?.appId}`} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-8`}>
                                        <div className='text-4xl text-primary'>
                                            {
                                                pl?.appId?.type == "Web" ? (<TbWorld />) : (<IoMdPhonePortrait />)
                                            }

                                        </div>
                                        <div className='text-lg font-dosis'>{pl?.appId?.project_name}</div>
                                    </Link>
                                ))
                            }
                            <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' />
                            <Link href="/add-project" className={`flex items-center justify-center gap-3 py-3 hover:underline transition-all px-8`}>
                                <div className='text-4xl text-primary'><CiCirclePlus /></div>
                                <div className='text-lg font-dosis'>Add Project</div>
                            </Link>
                        </div>
                    </div>
                </Dropdown>
            </div>
        )
    }
    return (
        <div className='w-1/3 flex flex-col items-center justify-center relative'>
            <div className='w-fit flex justify-center items-center gap-3 cursor-pointer' onClick={() => { setOpenAppBar(!openAppBar) }}>
                <div className='text-3xl text-primary'>
                    <SiCodeforces />
                </div>
                <h4 className='text-1-5xl font-medium font-dosis tracking-wider text-primaryGray hover:text-stone-900 transition-all'>
                    {currentApp[0]?.appId?.project_name}
                </h4>
            </div>
            <Dropdown isOpen={openAppBar} classw="flex items-center justify-center">
                <div className={` w-[350px] h-fit absolute border border-stone-900/20 top-10 rounded-md shadow-xl bg-main`}>
                    <div className='w-full flex flex-col items-center justify-start'>
                        {
                            appList.length == 0 ?
                                (
                                    <div className='text-xl font-dosis mt-4 text-primaryGray/50'>No other apps found</div>
                                ) : (
                                    <></>
                                )
                        }
                        {
                            appList?.map((pl, index) => (
                                <Link key={index} href={`/analytics?id=${pl?.appId?.appId}`} className={`flex items-center justify-start w-full gap-3 py-3 hover:bg-black/10 transition-all px-8`}>

                                    <div className='text-4xl text-primary'>
                                        {
                                            pl?.appId?.type == "Web" ? (<TbWorld />) : (<IoMdPhonePortrait />)
                                        }

                                    </div>
                                    <div className='text-xl font-dosis'>{pl?.appId?.project_name}</div>
                                </Link>
                            ))
                        }
                        <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' />
                        <Link href="/add-project" className={`flex items-center justify-center gap-3 py-3 hover:underline transition-all px-8`}>
                            <div className='text-4xl text-primary'><CiCirclePlus /></div>
                            <h5 className='text-xl font-dosis'>Add Project</h5>
                        </Link>
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}

export default ProjectList