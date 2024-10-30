import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'
import Dropdown from '../Animation/dropdown'
import { CiSettings } from 'react-icons/ci'
import { TiPinOutline } from 'react-icons/ti'
import { MdPushPin } from 'react-icons/md'
import { IoMdPhonePortrait } from 'react-icons/io'
import { LuPin, LuPinOff } from 'react-icons/lu'
import Loading from '@/app/loading'
import { useAxios } from '@/app/hooks/useAxios'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

const Box = ({ item, handleRequestttt }) => {


    const [openProjectSetting, setProjectSetting] = useState(false)
    const [projectDate, setProjectDate] = useState(null)



    const { toast } = useToast()


    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        try {

            await sendRequest({
                method: "POST",
                url: `/api/user/toggle-pin`,
                body: { appId: item.appId.appId },
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
                handleRequestttt()
            }


        }
    }, [res, error])



    useEffect(() => {
        const date = new Date(item?.appId?.createdAt);

        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        setProjectDate(formattedDate)


    }, [item])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className={`${item?.appId?.active ? " bg-main" : "bg-black/20 opacity-50 pointer-events-none"} cursor-pointer relative w-5/6 h-auto mb-4  flex lg:flex-row flex-col items-center justify-between rounded-md shadow-xl border border-stone-900/20  hover:border-primary transition-all`}>
            <Link href={`/analytics?id=${item?.appId?.appId}`} className='flex items-center lg:justify-normal justify-center lg:w-4/6 w-full lg:mb-0 mb-4 px-4 py-8'>

                {
                    item?.appId?.type === "Web" ? (
                        <div className='text-4xl text-primary'>
                            <TbWorld />
                        </div>
                    ) : (
                        <div className='text-4xl text-primary'>
                            <IoMdPhonePortrait />
                        </div>
                    )
                }

                <div className='text-1-5xl font-medium font-dosis tracking-wider text-primaryGray  ml-2  transition-all'>
                    {item?.appId?.project_name}
                </div>
            </Link>
            <div className='relative flex items-center lg:justify-end justify-center  lg:w-2/6 w-full px-4 py-8'>
                {
                    item?.appId?.active ? (
                        <div className='text-sm font-medium font-dosis tracking-wider text-primaryGray px-2 py-1 bg-gray-700/5 hover:bg-gray-800/10 rounded-md transition-all flex items-center'>
                            <div className='bg-green-500 w-3 h-3 rounded-full mr-1'></div>
                            Active
                        </div>
                    ) : (
                        <div className='text-sm font-medium font-dosis tracking-wider text-primaryGray px-2 py-1 bg-gray-700/5 hover:bg-gray-800/10 rounded-md transition-all flex items-center'>
                            <div className='bg-red-500 w-3 h-3 rounded-full mr-1'></div>
                            Inactive
                        </div>
                    )
                }



                <div className='text-sm font-medium font-dosis tracking-wider text-primaryGray  ml-2 px-2 py-1 bg-gray-700/5 hover:bg-gray-800/10 rounded-md transition-all'>
                    {projectDate}
                </div>
                <div onClick={() => { setProjectSetting(!openProjectSetting) }} className=' relative w-8 h-8 flex items-center justify-center cursor-pointer ml-4 text-2xl text-primaryGray hover:bg-black/5 p-1 rounded-full transition-all'>
                    <BsThreeDots />
                    <Dropdown isOpen={openProjectSetting}>
                        <div className={`min-w-36 h-fit absolute border border-stone-900/20 top-10 right-0 rounded-md shadow-xl bg-main`}>

                            {/* <hr className='w-5/6 mx-auto border-b-2 border-secondary/20  mt-4' /> */}
                            <Link href="#" className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10  transition-all px-4`}>
                                <div className='text-2xl text-primary'><CiSettings /></div>
                                <div className='text-base font-dosis'>Settings</div>

                            </Link>
                            {
                                item?.appId?.pin ? (
                                    <div onClick={() => { handleRequest(); }} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-4`}>
                                        <div className='text-2xl text-primary'><LuPinOff /></div>
                                        <div className='text-base font-dosis'>Remove Pin</div>

                                    </div>
                                ) : (<div onClick={() => { handleRequest() }} className={`flex items-center justify-start gap-3 py-3 hover:bg-black/10 transition-all px-4`}>
                                    <div className='text-2xl text-primary'><LuPin /></div>
                                    <div className='text-base font-dosis'>Pin</div>

                                </div>)
                            }

                        </div>
                    </Dropdown>
                </div>


            </div>
            {
                item?.appId?.pin ? (
                    <div className='absolute top-2 right-2 text-primary'>
                        <MdPushPin />
                    </div>
                ) : (<></>)
            }

        </div>
    )
}

export default Box