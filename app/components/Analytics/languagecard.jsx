"use client"

import React, { useEffect, useState } from 'react'
import ColumnsCharts from "@/app/components/Charts/customcolumnscharts"
import { useAppSelector } from '@/lib/redux/hooks';
import Loading from '@/app/loading';
import { useSearchParams } from 'next/navigation';
import { useAxios } from '@/app/hooks/useAxios';

const languagecard = () => {

    const [seed, setSeed] = useState(1);
    const date = useAppSelector((state) => state.dateSettings)
    const [languages, setLanguages] = useState([
        { languages: "/", visitor: "1" },
        { languages: "/", visitor: "0" }
    ])

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
            url: `/api/apps/languages-card?firstdate=${date.firstDate}&lastdate=${date.lastDate}`,
            body: { appId: appId },
        });
    };

    useEffect(() => {
        handleRequest()
    }, [date.lastDate, date.firstDate])

    useEffect(() => {
        if (loading) {

            setLanguages(res?.data)
           
        }
    }, [res, loading])


    if (!loading) {
        return (
            <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-[400px] bg-main  flex flex-col py-4">
                <Loading></Loading>
            </div>
        )
    }

    return (
        <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-[400px] bg-main  flex flex-col py-4">
            <ColumnsCharts data={languages} key={seed} ></ColumnsCharts>
        </div>
    )
}

export default languagecard