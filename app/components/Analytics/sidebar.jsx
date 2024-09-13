"use client"

import React from 'react'
import Menu from "@/app/components/Analytics/menu"


const sidebar = () => {
    return (
        <div className="w-1/6 h-full fixed top-0 left-0 px-4 py-4 border-r-2 border-primaryGray/20 bg-main">
            <div className="w-full h-20"></div>
            <div className="w-full flex flex-col text-stone-900  font-dosis text-xl gap-4 ">
              <Menu></Menu>

            </div>
        </div>
    )
}

export default sidebar