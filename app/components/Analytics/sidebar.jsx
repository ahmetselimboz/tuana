"use client"

import React from 'react'
import Menu from "@/app/components/Analytics/menu"
import LargeAIBtn from '../Ai/LargeAIBtn'


const sidebar = ({closePopup, isPopupOpen, setIsPopupOpen}) => {
    return (
        <div className="w-1/6 h-full fixed top-0 left-0  py-4 z-10 border-r-2 border-primaryGray/20 bg-main">
            {/* <div className="w-full h-20"></div> */}
            <div className='relative z-50 px-4 h-1/6 flex items-end justify-center mt-4 w-full'>
                <LargeAIBtn userInfo={""} chatField={true} closePopup={closePopup} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}></LargeAIBtn>
            </div>
            <div className='w-full px-4  my-4'>
                <hr className="border-t-2 border-primaryGray/20 w-full  rounded-md " />
            </div>

            <Menu></Menu>
        </div>
    )
}

export default sidebar