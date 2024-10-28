import React, { useEffect, useRef, useState } from 'react'
import WorldMap from "@/app/components/Map/map"
import CustomBarCharts from '../Charts/custombarcharts'
import { useSearchParams } from 'next/navigation'
import { useAxios } from '@/app/hooks/useAxios'
import { useAppSelector } from '@/lib/redux/hooks'
import Loading from '@/app/loading'

const countryInfo = '/country.json'

const locationcard = () => {

    const [seed, setSeed] = useState(1);
    const [mergeData, setMergeData] = useState([])
    const [countriesData, setCountriesData] = useState([
        { country: "TR", visitor: 1 },
    ])
    const date = useAppSelector((state) => state.dateSettings)

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        reset()
    }, [date.lastDate]);

    const params = useSearchParams()
    const appId = params.get("id")

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        await sendRequest({
            method: "POST",
            url: `/api/apps/location-card?firstdate=${date.firstDate}&lastdate=${date.lastDate}`,
            body: { appId: appId },
        });
    };

    useEffect(() => {
        handleRequest()
    }, [date.lastDate, date.firstDate])

    useEffect(() => {
        if (loading) {

            setCountriesData(res?.data?.totalLocationVisitor)
        }
    }, [res, loading])


    // const countriesData = [
    //     { country: "TR", visitor:3 },
    //     { country: "CA", visitor: 2 },
    //     { country: "PL", visitor: 1 }
    // ]

    useEffect(() => {
        if (loading) {
            fetch(countryInfo)
                .then(response => response.json())
                .then(data => {
                    const mergedData = Object.keys(data).map((code) => {
                        const countryInfo = countriesData?.find((country) => country.country === code);
                        return {
                            code,
                            ...data[code],
                            visitor: countryInfo?.visitor || 0
                        };
                    });
                    
                    setMergeData(mergedData)
                })
                .catch(error => {
                    console.error('Error fetching country data:', error);
                });
        }

    }, [countriesData, loading]);
    
    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight);
        }
    }, [divRef.current, mergeData]);

    if (loading) {
        return (
            <div className="rounded-md shadow-xl border border-stone-900/20 bg-main w-full h-[483px] flex lg:flex-row flex-col p-2">
                <Loading></Loading>
            </div>
        )
    }

    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 bg-main w-full h-[483px] flex lg:flex-row flex-col p-2">
            <div className="lg:w-4/6 w-full relative flex items-center justify-center">
                <WorldMap mergeData={mergeData}></WorldMap>
            </div>
            <div className='lg:w-2/6 w-full h-fit py-5 overflow-hidden relative'>
                <div ref={divRef} className='w-full h-full flex flex-col gap-9 mt-3 pr-6 pl-8'>
                    {
                        mergeData?.filter((item) => item.visitor > 0).sort((a, b) => b.visitor - a.visitor).map((dt, index) => (
                            <div key={index} className='w-full flex flex-row justify-between font-dosis text-sm '>
                                <div >{dt.name}</div>
                                <div>{dt.visitor}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full  absolute top-0 right-0'>

                    <CustomBarCharts barData={countriesData} barHeight={"5px"} height={height + 80} key={seed} ></CustomBarCharts>
                </div>
            </div>
        </div>
    )
}


export default locationcard