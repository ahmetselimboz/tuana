import React, { useEffect, useState } from 'react'
import WorldMap from "@/app/components/Map/map"
import CustomBarCharts from '../Charts/custombarcharts'

const countryInfo = '/country.json'

const locationcard = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const [seed, setSeed] = useState(1);
    const [mergeData, setMergeData] = useState([])

    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        reset()

    }, [selectedDate]);


    const countriesData = [
        { country: "TR", visitor: 5 },
        { country: "PL", visitor: 2 },
        { country: "CA", visitor: 3 },
    ]

    useEffect(() => {
        fetch(countryInfo)
            .then(response => response.json())
            .then(data => {
                const mergedData = Object.keys(data).map((code) => {
                    const countryInfo = countriesData.find((country) => country.country === code); // Ülke kodunu bul
                    return {
                        code,
                        ...data[code],
                        visitor: countryInfo?.visitor || 0 // Ziyaretçi verisi yoksa 0 olarak ekle
                    };
                });

                setMergeData(mergedData)
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
            });
    }, []);

    const totalHeight = countriesData.length * 70;

    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 bg-main w-full h-[483px] flex lg:flex-row flex-col p-2">
            <div className="lg:w-4/6 w-full relative flex items-center justify-center">
                <WorldMap mergeData={mergeData}></WorldMap>
            </div>
            <div className='lg:w-2/6 w-full h-[465px] py-5 overflow-hidden relative'>
                <div className='w-full h-full flex flex-col gap-9 mt-3 pr-6 pl-8'>
                    {
                        mergeData.filter((item) => item.visitor > 0).sort((a, b) => b.visitor - a.visitor).map((dt, index) => (
                            <div key={index} className='w-full flex flex-row justify-between font-dosis text-sm '>
                                <div >{dt.name}</div>
                                <div>{dt.visitor}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full h-full absolute top-0 right-0'>

                    <CustomBarCharts barData={countriesData} barHeight={"5px"} height={totalHeight} key={seed} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDropdown={selectedDropdown} setSelectedDropdown={setSelectedDropdown}></CustomBarCharts>
                </div>
            </div>
        </div>
    )
}

export default locationcard