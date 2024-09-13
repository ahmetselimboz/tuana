"use client"

import React, { useEffect, useState } from 'react'
import ColumnsCharts from "@/app/components/Charts/customcolumnscharts"

const languagecard = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const [seed, setSeed] = useState(1);

    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        reset()
    }, [selectedDate]);

    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-full bg-main  flex flex-col py-4">
            <ColumnsCharts key={seed} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDropdown={selectedDropdown} setSelectedDropdown={setSelectedDropdown}></ColumnsCharts>
        </div>
    )
}

export default languagecard