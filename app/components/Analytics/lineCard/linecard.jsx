"use client"

import React, { useEffect, useState } from 'react'
import DateDropdown from "@/app/components/Animation/datedropdown"
import CustomDatePicker from "@/app/components/Charts/customdatepicker"
import CustomLineChart from "@/app/components/Charts/customlinechart"
import { useSearchParams } from 'next/navigation'
import { useAxios } from '@/app/hooks/useAxios'
import Loading from '@/app/loading'
import { useAppSelector } from '@/lib/redux/hooks'
import LargeAIBtn from '../../Ai/LargeAIBtn'
import SmallAIBtn from '../../Ai/SmallAIBtn'


const linecard = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [dataValue, setDataValue] = useState([
        { label: "Total Visits", value: 0 },
        { label: "Total Pageviews", value: 0 },
        { label: "New Visitors", value: 0 },
        { label: "Visit Duration", value: "0m 0s" },
    ])
    const [dataChart, setDataChart] = useState([
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
    ])
    const date = useAppSelector((state) => state.dateSettings)
    const selectedDropdown = useAppSelector((state) => state.dateSettings.dropdown)
    const [seed, setSeed] = useState(1);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

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
            url: `/api/apps/line-card?firstdate=${date.firstDate}&lastdate=${date.lastDate}`,
            body: { appId: appId },
        });
    };

    useEffect(() => {
        handleRequest()

    }, [date.lastDate, date.firstDate])

    // const options = [
    //     { label: "Total Visits", value: dataValue?.visitor?.totalVisitor?.length },
    //     { label: "Total Pageviews", value: dataValue?.visitor?.totalPage?.length },
    //     { label: "New Visitors", value: dataValue?.visitor?.newVisitors?.length },
    //     { label: "Visit Duration", value: dataValue?.visitor?.calculateDuration },
    // ];

    // const opti = [
    //     { value: res?.visitor?.totalVisitor },
    //     { value: res?.visitor?.totalPage },
    //     { value: res?.visitor?.newVisitors },
    //     { value: res?.duration?.calculateDuration },
    // ];


    useEffect(() => {
        if (loading) {

            setDataValue([
                { label: "Total Visits", value: res?.visitor?.totalVisitor?.length },
                { label: "Total Pageviews", value: res?.visitor?.totalPage?.length },
                { label: "New Visitors", value: res?.visitor?.newVisitors?.length },
                // { label: "Visit Duration", value: res?.visitor?.calculateDuration },
            ])
            setDataChart([
                { label: "Total Visits", value: res?.visitor?.totalVisitor, status: false },
                { label: "Total Pageviews", value: res?.visitor?.totalPage, status: false },
                { label: "New Visitors", value: res?.visitor?.newVisitors, status: false },
                // { label: "Visit Duration", value: res?.duration?.calculateDuration, status: true },
            ])
        }


    }, [res, loading])


    if (!loading) {
        return (
            <div className=" rounded-md shadow-xl border border-stone-900/20 bg-main w-full lg:h-[600px] flex flex-col mb-12">
                <Loading></Loading>
            </div>
        )
    }

    return (
        <div className=" rounded-md shadow-xl border border-stone-900/20 bg-main w-full lg:h-[600px] flex flex-col mb-12 relative">
            <div className='w-full h-[71px] flex items-center absolute lg:hidden '>
            <SmallAIBtn></SmallAIBtn>
            </div>
            <div className="lg:h-full h-fit lg:w-1/5 w-full flex lg:hidden   tabs-date  items-center justify-start px-2 lg:py-0 py-3">
                {/* <div className='w-full mb-4'>
                    <LargeAIBtn></LargeAIBtn>
                </div> */}
                <div className='w-[160px] border border-stone-900/50 rounded-md'>
                    <DateDropdown></DateDropdown>
                </div>
                
            </div>
            <div className="flex items-center lg:flex-row lg:flex-nowrap flex-wrap justify-center w-full lg:h-[100px] h-fit lg:py-2 p-2">
                {dataValue.map((opt, index) => (
                    <React.Fragment key={index}>
                        <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />
                        <div

                            onClick={() => {
                                handleTabClick(index);
                                reset();
                            }}
                            className={`lg:h-full h-fit lg:w-1/5 w-1/2 px-4 lg:m-2 lg:py-2 py-3 rounded-t-md cursor-pointer font-dosis ${activeTab === index ? ' bg-stone-400/10 border-b-2 border-primary' : ''
                                }`}
                        >
                            <div className="text-primary font-medium text-center text-1-5xl underline">
                                {opt.label}
                            </div>
                            {
                                !loading ? (
                                    <Loading width="w-8" height="h-8"></Loading>
                                ) : (
                                    <div className="text-primaryGray font-semibold text-center text-2xl">
                                        {opt.value}
                                    </div>
                                )
                            }

                        </div>
                        <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />
                    </React.Fragment>
                ))}
                <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />
                <div className="lg:h-full h-fit lg:w-[200px] w-1/2 lg:flex hidden  tabs-date  items-center justify-center px-4 lg:py-0 py-3">
                    <LargeAIBtn></LargeAIBtn>
                </div>
                <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />

                <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />
                <div className="lg:h-full h-fit lg:w-[200px] w-1/2 lg:flex hidden  tabs-date  items-center justify-center px-4 lg:py-0 py-3">
                    <DateDropdown
                        clw="border-2 border-stone-900/10"

                    ></DateDropdown>
                </div>
                <hr className="lg:block hidden h-4/6 border-l border-stone-900/10 " />

            </div>

            <div className="w-full lg:px-8 px-3 py-6 flex items-center justify-between">
                <CustomDatePicker ></CustomDatePicker>
            </div>
            <div className="lg:px-4 my-auto">
                <CustomLineChart data={dataChart[activeTab]} key={seed}></CustomLineChart>
            </div>
        </div>
    )
}

export default linecard;