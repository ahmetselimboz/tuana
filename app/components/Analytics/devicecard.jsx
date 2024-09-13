"use client"

import React, { useEffect, useState } from 'react'
import CustomPieChart from "@/app/components/Charts/custompiecharts"

const devicecard = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const [activeDevices, setActiveDevices] = useState(0);
    const [seed, setSeed] = useState(1);

    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        reset()
    }, [selectedDate]);

    const handleDeviceClick = (index) => {
        setActiveDevices(index);
    };

    const deviceMenu = [
        { label: "Browser" },
        { label: "OS" },
        { label: "Device" },
      ]

    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-[336px] bg-main  flex flex-col p-4 mb-8">
            <div className="w-full flex items-center justify-center gap-2 font-dosis text-lg mt-2">
                {
                    deviceMenu.map((opt, index) => (
                        <div key={index} onClick={() => { handleDeviceClick(index); reset() }} className={`text-stone-900 underline hover:text-primary transition-all font-medium ${activeDevices == index ? "pie-active " : ""} cursor-pointer`}>{opt.label}</div>

                    ))
                }

            </div>
            <div className="w-full h-fit flex items-center justify-center ">
                <CustomPieChart key={seed} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDropdown={selectedDropdown} setSelectedDropdown={setSelectedDropdown}></CustomPieChart>
            </div>

        </div>
    )
}

export default devicecard