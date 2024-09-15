"use client"

import React, { useEffect, useState } from 'react'
import DateDropdown from "@/app/components/Animation/datedropdown"
import CustomDatePicker from "@/app/components/Charts/customdatepicker"
import CustomLineChart from "@/app/components/Charts/customlinechart"

const linecard = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const [activeTab, setActiveTab] = useState(0);
    const [seed, setSeed] = useState(1);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        reset()
    }, [selectedDate]);


    const options = [
        { label: "Total Visits", value: "85" },
        { label: "Total Pageviews", value: "128" },
        { label: "New Visitors", value: "11" },
        { label: "Visit Duration", value: "14m 36s" },
    ];


    return (
        <div className=" rounded-md shadow-xl border border-stone-900/20 bg-main w-full lg:h-[600px] flex flex-col mb-12">
            <div className="lg:h-full h-fit lg:w-1/5 w-full flex lg:hidden   tabs-date  items-center justify-end px-2 lg:py-0 py-3">
                <div className='w-[160px] border border-stone-900/50 rounded-md'>
                    <DateDropdown
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setSelectedDropdown={setSelectedDropdown}
                    ></DateDropdown>
                </div>
            </div>
            <div className="flex items-center lg:flex-row lg:flex-nowrap flex-wrap justify-center w-full lg:h-[80px] h-fit lg:p-0 p-2">
                {options.map((opt, index) => (
                    <React.Fragment key={index}>
                        <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />
                        <div
                            key={index}
                            onClick={() => {
                                handleTabClick(index);
                                reset();
                            }}
                            className={`lg:h-full h-fit lg:w-1/5 w-1/2 px-4 lg:py-2 py-3 rounded-md cursor-pointer font-dosis ${activeTab === index ? 'lg:tabs-active lg:bg-black/0 bg-black/10' : 'lg:tabs-deactive'
                                }`}
                        >
                            <div className="text-primary font-medium text-center text-1-5xl underline">
                                {opt.label}
                            </div>
                            <div className="text-primaryGray font-semibold text-center text-2xl">
                                {opt.value}
                            </div>
                        </div>
                        <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />
                    </React.Fragment>
                ))}

                <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />
                <div className="lg:h-full h-fit lg:w-1/5 w-1/2 lg:flex hidden bg-primaryGray/20 tabs-date  items-center justify-center px-4 lg:py-0 py-3">
                    <DateDropdown
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setSelectedDropdown={setSelectedDropdown}
                    ></DateDropdown>
                </div>
                <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />

            </div>

            <div className="w-full lg:px-8 px-3 py-6 flex items-center justify-between">
                <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDropdown={selectedDropdown} setSelectedDropdown={setSelectedDropdown}></CustomDatePicker>
            </div>
            <div className="lg:px-4 my-auto">
                <CustomLineChart key={seed} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDropdown={selectedDropdown} setSelectedDropdown={setSelectedDropdown}></CustomLineChart>
            </div>
        </div>
    )
}

export default linecard