"use client"
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi';
import { RiHome3Line } from "react-icons/ri";
import LargeAIBtn from '../Ai/LargeAIBtn';
import { AiOutlineSearch } from "react-icons/ai"; // SEO
import { FaUsers } from "react-icons/fa"; // User Interactions
import { MdLocalPhone, MdOutlineTrackChanges } from "react-icons/md"; // Goals
import { HiOutlinePresentationChartBar } from "react-icons/hi"; // Channel Management
import { RiAdvertisementLine } from "react-icons/ri"; // Ads Management
import { FiDivideSquare } from "react-icons/fi"; // A/B Tests
import { TbDeviceDesktopAnalytics } from "react-icons/tb"; // Cross Platform
import { BsGraphUp } from "react-icons/bs"; // Predictive Analytics
import { BiBarChartAlt2 } from "react-icons/bi"; // Reports
import { FiSettings } from "react-icons/fi"; // Settings
import { MdOutlineFeedback } from "react-icons/md"; // Give a feedback
import { AiOutlineQuestionCircle } from "react-icons/ai"; // Help
import { MdOutlineContactMail } from "react-icons/md"; // Contact Us


const menu = () => {
    // const pathname = usePathname();
    // const params = useSearchParams()
    // const id = params.get("id")

    const pathname = usePathname();
    const params = useSearchParams();

    const [id, setId] = useState(null);

    useEffect(() => {
        const paramId = params.get('id');
        if (paramId) {
            setId(paramId); // State'i burada güncelle
        }
    }, [params]);

    const sidebar = [
        {
            icon: RiHome3Line, title: "Homepage", url: `/analytics?id=${id}`,
        },
        {
            icon: AiOutlineSearch, title: "SEO (Web?)", url: `/seo`,
        },
        {
            icon: FaUsers, title: "User Interactions", url: `/user-interactions`,
        },
        {
            icon: MdOutlineTrackChanges, title: "Goals", url: `/goals`,
        },
        {
            icon: HiOutlinePresentationChartBar, title: "Channel Management", url: `/channel-management`,
        },
        {
            icon: RiAdvertisementLine, title: "Ads Management", url: `/ads-management`,
        },
        {
            icon: FiDivideSquare, title: "A/B Tests", url: `/ab-tests`,
        },
        {
            icon: TbDeviceDesktopAnalytics, title: "Cross Platform (W+M?)", url: `/cross-platform`,
        },
        {
            icon: BsGraphUp, title: "Predictive Analytics", url: `/predictive-analytics`,
        },
        {
            icon: BiBarChartAlt2, title: "Reports", url: `/reports`,
        },
    ];


    return (
        <>
            {/* <div className="w-full h-12 rounded-lg cursor-pointer transition-all px-4 hover:w-full text-2xl text-primary hover:text-main hover:bg-gradient-to-b hover:from-primary hover:to-primary shadow-lg hover:shadow-xl bg-gradient-to-b from-main to-zinc-200  border-2 border-primary flex items-center justify-center flex-row">
                <HiOutlineSparkles className=" text-3xl mr-1" />
                <div>Ask AI</div>
            </div> */}

            <div className="w-full h-full pl-1 pr-4">
                {sidebar.map((sb, index) => {
                    const isActive = `${pathname}?${params}` === sb.url;
                    return (
                        <div key={index}>
                            <Link
                                href={sb.url}

                                className={`flex items-center gap-3 w-full transition-all px-4 py-4  text-base ${isActive
                                    ? "bg-primary text-main hover:bg-secondary rounded-md"
                                    : "hover:bg-primaryGray/15 bg-primaryGray/0"
                                    }`}
                            >
                                <sb.icon
                                    className={`text-2xl ${isActive ? "text-white" : "text-primary"}`}
                                />
                                <div className="w-fit">{sb.title}</div>
                            </Link>
                            <hr className="border-t-2 border-primaryGray/20 w-full  rounded-md px-4" />
                        </div>
                    );
                })}


                <Link
                    href=""
                    className={`flex items-center gap-3 w-full text-base transition-all px-4 py-4 my-2 rounded-md bg-primary text-main hover:bg-secondary`}
                >
                    <FiSettings
                        className={`text-2xl text-white`}
                    />
                    <div className="w-fit">Settings</div>
                </Link>
                <Link
                    href=""
                    className={`flex items-center gap-3 w-full text-base transition-all px-4 py-4 mb-2 rounded-md bg-primary text-main hover:bg-secondary`}
                >
                    <MdOutlineFeedback
                        className={`text-2xl text-white`}
                    />
                    <div className="w-fit">Give a feedback</div>
                </Link>
                <Link
                    href=""
                    className={`flex items-center gap-3 w-full text-base transition-all px-4 py-4 mb-2 rounded-md bg-primary text-main hover:bg-secondary`}
                >
                    <AiOutlineQuestionCircle
                        className={`text-2xl text-white`}
                    />
                    <div className="w-fit">Help</div>
                </Link>
                <Link
                    href=""
                    className={`flex items-center gap-3 w-full text-base transition-all px-4 py-4 mb-2 rounded-md bg-primary text-main hover:bg-secondary`}
                >
                    <MdLocalPhone
                        className={`text-2xl text-white`}
                    />
                    <div className="w-fit">Contact Us</div>
                </Link>

                <div className='w-full h-[140px]'></div>
            </div>


        </>
    )
}

export default menu