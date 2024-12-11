import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'
import MySlider from './MySlider'
import ChatField from './ChatField'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setChatFullscreen } from '@/lib/redux/features/chatSetttings/chatSlice'


const LargeAICard = ({ userInfo, closePopup }) => {

    const [askQuestion, setAskQuestion] = useState(null)
    const dispatch = useDispatch()

    const questions = [
        "How do I get more people to use my platform?",
        "What can I do to bring more users?",
        "How do I make my platform more popular?",
        "What can I change to keep users coming back?",
        "How do I make people recommend?",
        "What are easy ways to get more users?",
    ]

    return (
        <>

            <div className={`relative lg:w-[600px] w-full h-[450px] rounded-md  shadow-xl border border-stone-900/20  bg-main `}>
                <button
                    onClick={() => {
                        dispatch(setChatFullscreen(true))
                        //closePopup()
                    }}
                    className=" group  absolute top-3 right-10  z-10"
                >
                    <MdFullscreen className='text-stone-900/70 text-1-5xl transition-all hover:text-stone-900' />
                    <div
                        className="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100">
                        Fullsize
                    </div>
                </button>
                <button onClick={closePopup} className=" group  absolute top-3 right-3 z-10">
                    <IoMdClose className='text-stone-900/70  text-1-5xl transition-all hover:text-stone-900' />
                    <div
                        className="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100">
                        Close
                    </div>
                </button>
                <div className='flex items-center mt-5'>
                    <div className="text-primary font-dosis lg:text-3xl text-2xl font-medium mb-3 pl-8">
                        Ask Tuan-AI
                        <hr className="border-b-2 border-primary w-[38px]" />
                    </div>

                </div>
                <div className='w-full flex items-center justify-center px-8'>

                    <MySlider questions={questions} setAskQuestion={setAskQuestion}></MySlider>
                </div>
                <ChatField askQuestion={askQuestion} userInfo={userInfo}></ChatField>



            </div>

        </>

    )
}

export default LargeAICard