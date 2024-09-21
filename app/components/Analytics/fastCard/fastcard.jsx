'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { FiClock, FiUserPlus } from "react-icons/fi"
import { HiStatusOnline } from "react-icons/hi"
import { AiOutlineFundView } from "react-icons/ai"
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/lib/redux/hooks'
import Loading from '@/app/loading'
import CurrentVisitor from './CurrentVisitor'
import NewVisitor from './NewVisitor'
import TopPage from './TopPage'
import AvgDuration from './AvgDuration'

const fastcard = () => {


  return (
    <div className=" rounded-md shadow-xl border border-stone-900/20 bg-main w-full lg:h-[150px] h-fit flex lg:flex-row flex-col  items-center mt-6  mb-12">

      <Suspense fallback={<Loading />}>
        <CurrentVisitor></CurrentVisitor>
      </Suspense>
      <hr className="lg:border-l-2 border-t-2 border-primaryGray/20 lg:h-5/6 h-0 lg:w-0 w-5/6 rounded-md " />
      <Suspense fallback={<Loading />}>
        <NewVisitor></NewVisitor>
      </Suspense>
      <hr className="lg:border-l-2 border-t-2 border-primaryGray/20 lg:h-5/6 h-0 lg:w-0 w-5/6 rounded-md " />
      <Suspense fallback={<Loading />}>
        <TopPage></TopPage>
      </Suspense>
      <hr className="lg:border-l-2 border-t-2 border-primaryGray/20 lg:h-5/6 h-0 lg:w-0 w-5/6 rounded-md " />
      <Suspense fallback={<Loading />}>
        <AvgDuration></AvgDuration>
      </Suspense>
    </div>
  )
}

export default fastcard