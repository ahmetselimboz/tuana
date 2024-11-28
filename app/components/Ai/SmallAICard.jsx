import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoMdClose } from 'react-icons/io'
import { CgDanger } from "react-icons/cg";
import { CiWarning } from 'react-icons/ci';
import { LuPartyPopper } from 'react-icons/lu';
import { IoWarningOutline } from 'react-icons/io5';
import ChatField from './ChatField';

const SmallAICard = ({ closePopup }) => {

    const [box, setBox] = useState(null)

    useEffect(() => {
        //console.log("🚀 ~ SmallAICard ~ box:", box)
    }, [box])

    if (box == null) {
        return (
            <div className='lg:w-[468px] w-full h-[350px] relative rounded-md  shadow-xl border border-stone-900/20  bg-main '>
                <button onClick={closePopup}><IoMdClose className='text-stone-900/70 absolute top-3 right-3  text-1-5xl transition-all hover:text-stone-900' /></button>
                <div className="text-primary font-dosis text-xl  font-medium mb-3 pl-8">
                    Ask Tuan-AI
                    <hr className="border-b-2 border-primary w-[38px]" />
                </div>
                <div className='w-full h-full flex flex-col items-center  px-8'>
                    <div onClick={() => { setBox("Danger") }} className='w-full h-[80px] mb-2 px-2 border rounded-md shadow-md hover:shadow-xl transition-all cursor-pointer  border-red-600 bg-red-600/20 flex items-center justify-around'>
                        <CgDanger className='text-red-600 text-4xl' />
                        <div>
                            Lorem ipsum odor amet, consectetuer adipiscing...
                        </div>
                        <div>
                            <div className='bg-red-600 rounded-full w-5 h-5 text-sm flex items-center justify-center text-main'>
                                3
                            </div>
                        </div>
                    </div>
                    <div onClick={() => { setBox("Warning") }} className='w-full h-[80px] mb-2  px-2  border rounded-md shadow-md hover:shadow-xl transition-all cursor-pointer  border-yellow-500 bg-yellow-500/20 flex items-center justify-around'>
                        <IoWarningOutline className='text-yellow-500 text-4xl' />
                        <div>
                            Lorem ipsum odor amet, consectetuer adipiscing...
                        </div>
                        <div>
                            <div className='bg-yellow-500 rounded-full w-5 h-5 text-sm flex items-center justify-center text-main'>
                                1
                            </div>
                        </div>
                    </div>
                    <div onClick={() => { setBox("Party") }} className='w-full h-[80px] mb-2  px-2  border rounded-md shadow-md hover:shadow-xl transition-all cursor-pointer  border-green-600  bg-green-500/20 flex items-center justify-around'>
                        <LuPartyPopper className='text-green-600 text-4xl' />
                        <div>
                            Lorem ipsum odor amet, consectetuer adipiscing...
                        </div>
                        <div>
                            <div className='bg-green-600  rounded-full w-5 h-5 text-sm flex items-center justify-center text-main'>
                                4
                            </div>
                        </div>
                    </div>


                </div>




            </div>
        )
    }

    if (box === "Danger") {
        return (
            <div className='lg:w-[468px] w-full h-[350px] relative rounded-md  shadow-xl border border-stone-900/20  bg-main '>
                <button onClick={closePopup}><IoMdClose className='text-stone-900/70 absolute top-3 right-3  text-1-5xl transition-all hover:text-stone-900' /></button>
                <button onClick={() => { setBox(null) }}><IoIosArrowBack className='text-stone-900/70 absolute top-7 left-2  text-1-5xl transition-all hover:text-stone-900' /></button>
                <div className='flex items-start '>
                    <div className="text-primary font-dosis text-xl  font-medium mb-3 pl-8">
                        Ask Tuan-AI
                        <hr className="border-b-2 border-primary w-[38px]" />
                    </div>
                    <div className='bg-red-600/10 border-2 border-red-600 text-red-600 py-0 px-2 rounded-md ml-6 mt-0.5 flex items-center'>
                        <CgDanger className='text-red-600 text-base mr-1' />
                        Danger
                    </div>

                </div>
                <ChatField></ChatField>



            </div>
        )
    }

    if (box === "Warning") {
        return (
            <div className='lg:w-[468px] w-full h-[350px] relative rounded-md  shadow-xl border border-stone-900/20  bg-main '>
                <button onClick={closePopup}><IoMdClose className='text-stone-900/70 absolute top-3 right-3  text-1-5xl transition-all hover:text-stone-900' /></button>
                <button onClick={() => { setBox(null) }}><IoIosArrowBack className='text-stone-900/70 absolute top-7 left-2  text-1-5xl transition-all hover:text-stone-900' /></button>
                <div className='flex items-start '>
                    <div className="text-primary font-dosis text-xl  font-medium mb-3 pl-8">
                        Ask Tuan-AI
                        <hr className="border-b-2 border-primary w-[38px]" />
                    </div>
                    <div className='bg-yellow-500/10 border-2 border-yellow-500 text-yellow-500 py-0 px-2 rounded-md ml-6 mt-0.5 flex items-center'>
                        <IoWarningOutline className='text-yellow-500 text-base mr-1' />
                        Warning
                    </div>

                </div>
                <ChatField></ChatField>



            </div>
        )
    }

    if (box === "Party") {
        return (
            <div className='lg:w-[468px] w-full h-[350px] relative rounded-md  shadow-xl border border-stone-900/20  bg-main '>
                <button onClick={closePopup}><IoMdClose className='text-stone-900/70 absolute top-3 right-3  text-1-5xl transition-all hover:text-stone-900' /></button>
                <button onClick={() => { setBox(null) }}><IoIosArrowBack className='text-stone-900/70 absolute top-7 left-2  text-1-5xl transition-all hover:text-stone-900' /></button>

                <div className='flex items-start '>
                    <div className="text-primary font-dosis text-xl  font-medium mb-3 pl-8">
                        Ask Tuan-AI
                        <hr className="border-b-2 border-primary w-[38px]" />
                    </div>
                    <div className='bg-green-600/10 border-2 border-green-600 text-green-700 py-0 px-2 rounded-md ml-6 mt-0.5 flex items-center'>
                        <LuPartyPopper className='text-green-600 text-base mr-1' />
                        Good News!
                    </div>

                </div>

                <ChatField></ChatField>

            </div>
        )
    }

    return (
        <div className='lg:w-[468px] w-full h-[350px] relative rounded-md  shadow-xl border border-stone-900/20  bg-main '>
            <button onClick={closePopup}><IoMdClose className='text-stone-900/70 absolute top-3 right-3  text-1-5xl transition-all hover:text-stone-900' /></button>




        </div>
    )


}

export default SmallAICard