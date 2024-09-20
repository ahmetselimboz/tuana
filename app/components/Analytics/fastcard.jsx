'use client'

import React, { useEffect, useState } from 'react'
import { FiClock, FiUserPlus } from "react-icons/fi"
import { HiStatusOnline } from "react-icons/hi"
import { AiOutlineFundView } from "react-icons/ai"
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/lib/redux/hooks'

const fastcard = () => {

  const params = useSearchParams()
  const appId = params.get("id")

  const { activeUsers } = useCurrentUser(appId);

  return (
    <div className=" rounded-md shadow-xl border border-stone-900/20 bg-main w-full lg:h-[150px] h-fit flex lg:flex-row flex-col  items-center mt-6  mb-12">
      <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
        <HiStatusOnline className="text-primary text-5xl animate-blink" />
        <div className="text-primaryGray  font-dosis text-xl font-medium">Current Visitors</div>
        <div className="text-primaryGray  font-dosis text-xl">{activeUsers?.length == undefined ? 0 : activeUsers?.length}</div>
      </div>
      <hr className="lg:border-l-2 border-t-2 border-primaryGray/20 lg:h-5/6 h-0 lg:w-0 w-5/6 rounded-md " />
      <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
        <FiUserPlus className="text-primary text-5xl " />
        <div className="text-primaryGray  font-dosis text-xl font-medium">New Visitors</div>
        <div className="text-primaryGray  font-dosis text-xl">11</div>
      </div>
      <hr className="lg:border-l-2 border-t-2 border-primaryGray/20 lg:h-5/6 h-0 lg:w-0 w-5/6 rounded-md " />
      <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
        <AiOutlineFundView className="text-primary text-5xl " />
        <div className="text-primaryGray  font-dosis text-xl font-medium">Top Viewed Page</div>
        <div className="text-primaryGray  font-dosis text-xl">"/work"</div>
      </div>
      <hr className="lg:border-l-2 border-t-2 border-primaryGray/20 lg:h-5/6 h-0 lg:w-0 w-5/6 rounded-md " />
      <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
        <FiClock className="text-primary text-5xl " />
        <div className="text-primaryGray  font-dosis text-xl font-medium">Avg. Session Duration</div>
        <div className="text-primaryGray  font-dosis text-xl">6m 22s</div>
      </div>
    </div>
  )
}

export default fastcard