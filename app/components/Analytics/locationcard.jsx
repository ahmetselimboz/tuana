import React from 'react'
import WorldMap from "@/app/components/Map/map"

const locationcard = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {
    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 bg-main w-full h-auto flex flex-col p-2">
            <div className="w-4/6 relative">
                <WorldMap></WorldMap>
            </div>
            <div className='2/6 h-full'>

            </div>
        </div>
    )
}

export default locationcard