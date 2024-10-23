"use client"

import { useAxios } from '@/app/hooks/useAxios'
import Loading from '@/app/loading'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { useAppSelector } from '@/lib/redux/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { useDispatch } from 'react-redux'

const Plans = () => {

    const [selectedPlan, setSelectedPlan] = useState("free")

    
    const { toast } = useToast()
    const router = useRouter()
    const { loading, res, error, sendRequest } = useAxios();
  
    const handleRequest = async (e) => {
      try {
        await sendRequest({
          method: "POST",
          url: `/api/user/set-plan`,
          body: {
            plan: e,
          }
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
          description: "Plan selected!",
        })
  
        if (res?.user?.plans === "free") {
          router.push('/projects')
        } else {
          router.push('/payment')
        }
  
      }
  
    }, [res, error])


    if (loading) {
        return <Loading></Loading>
    }


    return (
        <div className='relative w-full lg:h-full pt-8 lg:pb-0 pb-8'>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-fit text-6xl font-medium text-primary mb-2'>
                    Plans
                </div>
                <hr className="border-b-2 border-primary w-1/3" />
            </div>
            <div className='flex lg:flex-row flex-col-reverse items-center justify-center px-10 pt-12 pb-4'>
                <div className='lg:w-1/3 w-full h-full lg:px-8 lg:mb-0 mb-8'>
                    <div onClick={()=>{setSelectedPlan("free")}} className={`rounded-3xl shadow-xl border-4 px-4 pt-10 pb-4 ${selectedPlan == "free" ? "border-primary/100": "border-primary/20"}  flex flex-col h-full hover:border-primary/100 cursor-pointer transition-all`}>
                        <div className='w-full mb-6'>
                            <div className='w-fit ml-4 text-5xl text-gray-800 font-semibold '>
                                Free
                            </div>

                        </div>
                        <hr className='rounded-full w-full border border-primaryGray/30' />

                        <div className='w-full'>
                            <div className='w-fit ml-4 text-4xl text-primary font-medium mb-6 flex flex-row items-center'>
                                $0 <div className='text-base ml-1'>per <br></br> month</div>
                            </div>
                        </div>
                        <div className='w-full mb-3'>
                            <div className='w-fit ml-4 text-2xl text-primaryGray font-normal  underline'>
                                Core Features
                            </div>
                        </div>
                        <div className='w-full mb-6'>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                    <div className='font-semibold mr-1'>10</div> daily AI limit
                                </div>
                            </div>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                    <div className='font-semibold mr-1'>1</div> project limit
                                </div>
                            </div>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-semibold  flex items-center'>
                                    Ads
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-3'>
                            <div className='w-fit ml-4 text-xl text-primaryGray font-semibold  '>
                                Support
                            </div>
                        </div>
                        <div className='w-full ml-4 flex flex-row items-center mb-1'>
                            <IoMdCheckmark className="text-2xl text-primary mr-2" />
                            <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                Docs
                            </div>
                        </div>

                    </div>
                </div>
                
                <div className='lg:w-1/3 w-full h-full lg:px-8 lg:mb-0 mb-8'>
                    <div onClick={()=>{setSelectedPlan("pro")}} className={`rounded-3xl shadow-xl border-4 px-4 pt-10 pb-4 ${selectedPlan == "pro" ? "border-primary/100": "border-primary/20"}  flex flex-col h-full hover:border-primary/100 cursor-pointer transition-all`}>
                        <div className='w-full mb-6'>
                            <div className='w-fit ml-4 text-5xl text-gray-800 font-semibold '>
                                Pro
                            </div>

                        </div>
                        <hr className='rounded-full w-full border border-primaryGray/30' />

                        <div className='w-full'>
                            <div className='w-fit ml-4 text-4xl text-primary font-medium mb-6 flex flex-row items-center'>
                                $8? <div className='text-base ml-1'>per <br></br> month</div>
                            </div>
                        </div>
                        <div className='w-full mb-3'>
                            <div className='w-fit ml-4 text-2xl text-primaryGray font-normal  underline'>
                                Core Features
                            </div>
                        </div>
                        <div className='w-full mb-6'>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                    <div className='font-semibold mr-1'>15</div> daily AI limit
                                </div>
                            </div>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                    <div className='font-semibold mr-1'>5</div> project limit
                                </div>
                            </div>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-semibold  flex items-center'>
                                    No-Ads
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-3'>
                            <div className='w-fit ml-4 text-xl text-primaryGray font-semibold  '>
                                Support
                            </div>
                        </div>
                        <div className='w-full ml-4 flex flex-row items-center mb-1'>
                            <IoMdCheckmark className="text-2xl text-primary mr-2" />
                            <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                Ticket + Docs
                            </div>
                        </div>

                    </div>
                </div>
                <div className='lg:w-1/3 w-full h-full lg:px-8 lg:mb-0 mb-8'>
                    <div onClick={()=>{setSelectedPlan("premium")}} className={`rounded-3xl shadow-xl border-4 px-4 lg:pt-10 pt-4 pb-4 ${selectedPlan == "premium" ? "border-primary/100": "border-primary/20"}  flex flex-col h-full hover:border-primary/100 cursor-pointer transition-all`}>
                        <div className='w-full mb-6 flex lg:flex-row flex-col-reverse lg:items-end items-start justify-between'>
                            <div className='w-fit ml-4 text-5xl text-gray-800 font-semibold '>
                                Premium
                            </div>
                            <div className='w-fit text-base text-main rounded-full bg-primary px-3 lg:mb-1 mb-4'>
                                Most Popular
                            </div>
                        </div>
                        <hr className='rounded-full w-full border border-primaryGray/30' />

                        <div className='w-full'>
                            <div className='w-fit ml-4 text-4xl text-primary font-medium mb-6 flex flex-row items-center'>
                                $15? <div className='text-base ml-1'>per <br></br> month</div>
                            </div>
                        </div>
                        <div className='w-full mb-3'>
                            <div className='w-fit ml-4 text-2xl text-primaryGray font-normal  underline'>
                                Core Features
                            </div>
                        </div>
                        <div className='w-full mb-6'>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                    <div className='font-semibold mr-1'>Limitless</div> daily AI
                                </div>
                            </div>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                    <div className='font-semibold mr-1'>Limitless</div> project limit
                                </div>
                            </div>
                            <div className='w-full ml-4 flex flex-row items-center mb-1'>
                                <IoMdCheckmark className="text-2xl text-primary mr-2" />
                                <div className='w-fit  text-lg text-primaryGray font-semibold  flex items-center'>
                                    No-Ads
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-3'>
                            <div className='w-fit ml-4 text-xl text-primaryGray font-semibold  '>
                                Support
                            </div>
                        </div>
                        <div className='w-full ml-4 flex flex-row items-center mb-1'>
                            <IoMdCheckmark className="text-2xl text-primary mr-2" />
                            <div className='w-fit  text-lg text-primaryGray font-normal  flex items-center'>
                                Ticket + Docs
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className='w-full flex flex-col items-center mt-4'>
                    <button onClick={()=>{handleRequest(selectedPlan)}} className='lg:text-2xl text-lg  text-main font-medium font-dosis tracking-wider px-16 py-2 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Plans