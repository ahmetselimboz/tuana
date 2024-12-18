"use client"

import React from 'react'
import Menu from "@/app/components/Analytics/menu"
import LargeAIBtn from '../Ai/LargeAIBtn'


const sidebar = () => {
    return (
        <div className="w-1/6 h-full fixed top-0 left-0  py-4 z-10 border-r-2 border-primaryGray/20 bg-main">
            <div className="w-full h-20"></div>
            <div className='relative z-50 px-4'>
                <LargeAIBtn userInfo={""} chatField={true}></LargeAIBtn>
            </div>
            <div className='w-full px-4  my-2'>
                <hr className="border-t-2 border-primaryGray/20 w-full  rounded-md " />
            </div>

            <div className="w-full flex flex-col text-stone-900  font-dosis text-xl gap-4 h-[100%] scroll-left custom-scrollbar">
                <Menu></Menu>

            </div>
        </div>
    )
}

export default sidebar