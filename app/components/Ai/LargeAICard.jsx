import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'
import MySlider from './MySlider'
import ChatField from './ChatField'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'


const LargeAICard = ({ userInfo, closePopup, toggleFullScreen, isFullScreen }) => {



    return (
        <>

            <div className={`relative lg:w-[600px] w-full h-[450px] rounded-md  shadow-xl border border-stone-900/20  bg-main `}>
                {/* <button
                    onClick={() => {
                        toggleFullScreen();

                    }}
                    className="absolute top-2 right-6 text-2xl p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                    {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
                </button> */}
                <button onClick={closePopup}><IoMdClose className='text-stone-900/70 absolute top-3 right-3  text-1-5xl transition-all hover:text-stone-900' /></button>
                <div className='flex items-center'>
                    <div className="text-primary font-dosis lg:text-3xl text-2xl font-medium mb-3 pl-8">
                        Ask Tuan-AI
                        <hr className="border-b-2 border-primary w-[38px]" />
                    </div>

                </div>
                <div className='w-full flex items-center justify-center px-8'>

                    <MySlider></MySlider>
                </div>
                <ChatField userInfo={userInfo} isFullScreen={isFullScreen}></ChatField>



            </div>

        </>

    )
}

export default LargeAICard