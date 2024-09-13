import Link from 'next/link';
import React from 'react'
import { RiHome3Line } from "react-icons/ri";
const menu = () => {

    const sidebar = [
        // {
        //     icon: RiHome3Line, title: "Real Time", url: "/analytics",
        // },

    ]
    
    return (
        <>
            <Link href="/analytics" className="flex  items-center gap-3 w-full bg-primary text-main  transition-all px-4 py-2 rounded-md">
                <RiHome3Line className="text-main text-3xl" />
                <div>Home Page</div>
            </Link>
            <hr className="border-t-2 border-primaryGray/20 w-full  rounded-md " />
            {
                sidebar.map((sb, index) => (
                    <Link href={sb.url} key={index} className="flex  items-center gap-3 w-full hover:bg-primaryGray/15 transition-all px-4 py-2 rounded-md">
                        <sb.icon className="text-primary text-3xl" />
                        <div>{sb.title}</div>
                    </Link>
                ))
            }
        </>
    )
}

export default menu