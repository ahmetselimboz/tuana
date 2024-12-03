"use client"

import React, { useEffect, useState } from 'react'
import CustomPieChart from "@/app/components/Charts/custompiecharts"
import { useSearchParams } from 'next/navigation';
import { useAxios } from '@/app/hooks/useAxios';
import { useAppSelector } from '@/lib/redux/hooks';
import Loading from '@/app/loading';

const devicecard = () => {

    const [activeDevices, setActiveDevices] = useState(0);
    const [seed, setSeed] = useState(1);
    const date = useAppSelector((state) => state.dateSettings)
    const [filteredBrowsers, setFilteredBrowsers] = useState({});

    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        reset()
    }, [date.lastDate]);

    const handleDeviceClick = (index) => {
        setActiveDevices(index);
    };



    const params = useSearchParams()
    const appId = params.get("id")

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        await sendRequest({
            method: "POST",
            url: `/api/apps/device-card`,
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
        setFilteredBrowsers({});

        if (res) {
            let result = [];

            result = res?.data?.reduce((acc, item) => {
                let key = "";

                switch (activeDevices) {
                    case 0:
                        key = item.userDevice.browser.name;
                        break;
                    case 1:
                        key = item.userDevice.os.name;
                        break;
                    case 2:
                        key = item.userDevice.device.type == null ? "Desktop" : item.userDevice.device.type;
                        break;
                    default:
                        return acc;
                }

                const existingItem = acc.find(obj => obj.device === key);

                if (existingItem) {
                    existingItem.number += 1;
                } else {
                    acc.push({ device: key, number: 1 });
                }

                return acc;
            }, []);

            const devices = result.map(item => item.device);

            const numbers = result.map(item => item.number);


            setFilteredBrowsers({
                device: devices,
                number: numbers
            });
        } else {
            setFilteredBrowsers({
                device: ["None"],
                number: [0]
            });
        }
    }, [activeDevices, res]);

    const deviceMenu = [
        { label: "Browser" },
        { label: "OS" },
        { label: "Device" },
    ]

    if (loading) {
        return (
            <div className="rounded-md shadow-xl border border-stone-900/20 w-full h-[336px] bg-main  flex flex-col p-4 mb-8">
                <Loading></Loading>
            </div>
        )
    }

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
                <CustomPieChart data={filteredBrowsers} key={seed} ></CustomPieChart>
            </div>

        </div>
    )
}

export default devicecard