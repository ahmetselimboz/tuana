import { useAxios } from '@/app/hooks/useAxios';
import { useAppSelector } from '@/lib/redux/hooks';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Journey = () => {

    const date = useAppSelector((state) => state.dateSettings)
    const [journeyData, setJourneyData] = useState([]);
    const params = useSearchParams()
    const appId = params.get("id")

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        await sendRequest({
            method: "POST",
            url: `/api/apps/get-journey`,
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
    }, [date])


    useEffect(() => {
        if (loading) {

            setJourneyData(res?.journey)


            //console.log("🚀 ~ useEffect ~ res?.journey:", res?.journey)

        }
    }, [res, loading])





    return (
        <div className='w-full flex flex-col items-start mb-10'>
            <div className='w-full flex flex-row items-center justify-between relative'>
                <div className="text-primary font-dosis text-3xl px-2 font-medium mb-3 ">
                    User Journey
                    <hr className="border-b-2 border-primary w-[38px]" />
                </div>
            </div>
            <div className="w-full flex flex-col space-y-6 rounded-md shadow-xl border border-stone-900/20 bg-main py-4 px-4 ">

                {journeyData?.map((journey, journeyIndex) => (
                    <div
                        key={journey.visitorId + journeyIndex}
                        className="w-full bg-main border border-stone-900/20 shadow-xl rounded-md p-4"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-primary">
                                A Visitor
                            </h3>
                            <p className="text-sm text-gray-500">Visit Date: {new Date(journey.date).toLocaleString()}</p>
                        </div>
                        <div className="relative">
                            <div className="flex overflow-hidden overflow-x-auto whitespace-nowrap max-w-full space-x-4 pb-1">
                                {journey.data.slice(0, 5).map((url, urlIndex) => (
                                    <div key={url + urlIndex} className="flex items-center">
                                        {urlIndex > 0 && (
                                            <div className="flex items-center text-gray-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-5 h-5 mx-2"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md shadow-md inline-block">
                                            {url}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {journey.data.length > 5 && (
                                <button
                                    className="absolute bottom-1 right-0 mt-2 text-sm px-2 py-1 text-primary border border-primary rounded-md  hover:bg-primary hover:text-main transition-all"
                                    onClick={() => {
                                        const updatedData = [...journeyData];
                                        updatedData[journeyIndex].expanded = !updatedData[journeyIndex].expanded;
                                        setJourneyData(updatedData);
                                    }}
                                >
                                    {journey.expanded ? "Show less" : "Show more"}
                                </button>
                            )}
                        </div>
                        {journey.expanded && (
                            <div className="flex overflow-x-auto whitespace-nowrap max-w-full space-x-4 mt-4">
                                {journey.data.map((url, urlIndex) => (
                                    <div key={url + urlIndex} className="flex items-center">
                                        {urlIndex > 0 && (
                                            <div className="flex items-center text-gray-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-5 h-5 mx-2"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md shadow-md inline-block">
                                            {url}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                ))}

            </div>
        </div>
    )
}

export default Journey