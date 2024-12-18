"use client"
import React, { useEffect, useRef, useState } from 'react'
import CustomBarCharts from "@/app/components/Charts/custombarcharts"
import { useAxios } from '@/app/hooks/useAxios';
import { useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';
import { useAppSelector } from '@/lib/redux/hooks';

const sourcescard = () => {

    const [seed, setSeed] = useState(1);
    const date = useAppSelector((state) => state.dateSettings)
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [sources, setSources] = useState([
        { route: "Direct/None", visitor: 1 },
    ])

    // const sources = [
    //     { route: "Direct/None", visitor: "44" },
    //     { route: "Google", visitor: "10" },
    //     { route: "Github", visitor: "36" },
    //     { route: "LinkedIn", visitor: "12" },
    //     { route: "Twitter", visitor: "18" },
    //     { route: "Yandex", visitor: "30" },
    //     { route: "Bing", visitor: "42" },
    //     { route: "Yahoo", visitor: "38" },
    // ]

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
            url: `/api/apps/sources-card`,
            body: {
                appId: appId,
                query: {
                    firstdate: date.firstDate,
                    lastdate: date.lastDate
                }
            },
        });
    };

    useEffect(() => {
        handleRequest()
    }, [date.lastDate, date.firstDate])

    useEffect(() => {
        if (loading) {

            setSources(res?.data?.totalSources)
        }
    }, [res, loading])

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight);

        }
    }, [divRef.current, sources]);



    if (loading) {
        return (
            <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-[400px] bg-main  flex flex-col py-4">
                <Loading></Loading>
            </div>
        )
    }

    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-[400px] bg-main  flex flex-col py-4">
            <div className="w-full flex items-center justify-between pr-5 pl-6 font-medium underline text-xl font-dosis">
                <div>Sources</div>
                <div>Visits</div>
            </div>
            <div className="w-full h-auto flex items-center justify-between relative">

                <div ref={divRef} className="w-full h-full flex flex-col items-start gap-[0.6rem] mx-9 mt-[4.5rem]">
                    {
                        sources?.sort((a, b) => b.visitor - a.visitor).slice(0, 8).map((opt, index) => (
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
                <div className="w-[98%] flex items-center justify-center absolute top-0">
                    <CustomBarCharts barHeight={"60%"} barData={sources} height={height - 15} key={seed} ></CustomBarCharts>
                </div>
            </div>
            {sources?.length > 8 && ( 
                <div className="w-full absolute bottom-0 flex items-center flex-col">
                   <div className='font-dosis font-light text-base  w-fit border-b border-primary/0 hover:border-b hover:border-primary text-primary mt-4 mb-1 transition-all cursor-pointer'>
                   View More
                   </div>
                </div>
            )}
        </div>
    )
}

export default sourcescard