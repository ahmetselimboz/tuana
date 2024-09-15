"use client"

import React, { useEffect, useState } from 'react'
import CustomBarCharts from "@/app/components/Charts/custombarcharts"

const pagescard = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const [seed, setSeed] = useState(1);


    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        reset()
  
    }, [selectedDate]);

    const pages = [
        { route: "/pages", visitor: "12" },
        { route: "/pages", visitor: "4" },
        { route: "/pages", visitor: "36" },
        { route: "/pages", visitor: "44" },
        { route: "/pages", visitor: "18" },
        { route: "/pages", visitor: "30" },
        { route: "/pages", visitor: "42" },
        { route: "/pages", visitor: "38" },
        { route: "/pages", visitor: "20" },
        { route: "/pages", visitor: "15" },
      ]

    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-full bg-main  flex flex-col py-4">
            <div className="w-full flex items-center justify-between pr-5 pl-6 font-medium underline text-xl font-dosis">
                <div>Pages</div>
                <div>Visitors</div>
            </div>
            <div className="w-full h-auto flex items-center justify-between relative">
                <div className="w-full h-full flex flex-col items-start gap-[0.78rem] mx-9 mt-[2.25rem]">
                    {
                        pages.sort((a, b) => b.visitor - a.visitor).map((opt, index) => (
                            <div key={index} className="font-dosis font-medium text-lg w-full text-stone-900 flex items-center justify-between">
                                <div className="">
                                    {opt.route}
                                </div>
                                <div className="">
                                    {opt.visitor}
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="w-[98%] h-full flex items-center justify-center absolute mt-10">
                    <CustomBarCharts barHeight={"60%"} barData={pages} height={450} key={seed} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDropdown={selectedDropdown} setSelectedDropdown={setSelectedDropdown}></CustomBarCharts>
                </div>

            </div>

        </div>
    )
}

export default pagescard