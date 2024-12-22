import { useAxios } from '@/app/hooks/useAxios';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { LuBadgeCheck } from 'react-icons/lu';
import { MdErrorOutline } from 'react-icons/md';

const Verifying = ({ setStage, appDetails }) => {
    const router = useRouter()

    const [status, setStatus] = useState(false)
   // const [count, setCount] = useState(0)
    const { toast } = useToast()
    const { loading: loading, res: res, error: error, sendRequest: sendRequest } = useAxios();
    const { loading: loading2, res: res2, error: error2, sendRequest: sendRequest2 } = useAxios();

    const handleRequest = async () => {
        try {
            await sendRequest({
                method: "POST",
                url: `/api/apps/verify`,
                body: { appId: appDetails.appId, domain: appDetails.domain }
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
                setStatus(true)
                toast({
                    variant: "default",
                    title: "Success",
                    description: res?.message,
                })
            }

        }
    }, [res, error])

    useEffect(() => {
        handleRequest()
        // setInterval(() => {

        // }, 5000)

    }, [])


    const handleRequest2 = async () => {
        try {
            await sendRequest2({
                method: "POST",
                url: `/api/apps/create-project`,
                body: appDetails
            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };


    useEffect(() => {



        if (res2 !== null) {

            if (res2.code !== 200) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: res2?.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            } else {
                setStage((prevState) => {
                    return {
                        ...prevState,
                        phase3: true,
                        phase4: false
                    };
                });

                router.push(`/analytics?id=${appDetails.appId}`)
            }


        }

    }, [res2, error2])



    return (
        <div className='relative lg:w-3/6 w-5/6 h-[400px] mb-4 px-10 py-8 flex flex-col  items-center justify-between rounded-md shadow-xl border border-stone-900/20 bg-main  transition-all'>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                {
                    status ? (
                        <div className='text-4xl text-primaryGray mb-4'>
                            Verified!
                        </div>
                    ) : (
                        <></>
                    )
                }
                {
                    res?.code !== 200 && res !== null ? (
                        <div className='text-4xl text-primaryGray mb-4'>
                            Verification Failed!
                        </div>
                    ) : (
                        <>
                        </>
                    )
                }

                {
                    res === null && error == null ? (
                        <div className='text-4xl text-primaryGray mb-4'>
                            Verifying Installation...
                        </div>
                    ) : (
                        <></>
                    )
                }

                {
                    status ? (
                        <div>
                            <IoMdCheckmarkCircleOutline className="text-primary text-6xl" />
                        </div>
                    ) : (
                        <></>
                    )
                }

                {
                    res?.code !== 200 && res !== null ? (
                        <div>
                            <MdErrorOutline className="text-red-600 text-6xl" />
                        </div>
                    ) : (
                        <></>
                    )
                }

                {
                    res === null && error == null ? (
                        <div>
                            <LuBadgeCheck className="text-primaryGray text-6xl animate-blink" />
                        </div>
                    ) : (
                        <></>
                    )
                }


            </div>
            <div className='w-full flex flex-col items-center'>
                {
                    res?.code !== 200 && res !== null ? (
                        <button onClick={() => {
                            setStage((prevState) => {
                                return {
                                    ...prevState,
                                    phase3: false,
                                    phase4: null
                                };
                            });

                        }} className={`lg:text-lg text-lg ${!status ? "" : ""} text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all`}>Restart</button>

                    ) : (
                        <button onClick={() => {

                            handleRequest2()

                        }} className={`lg:text-lg text-lg ${!status ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all`}>Start</button>

                    )
                }
            </div>
        </div>
    )
}

export default Verifying