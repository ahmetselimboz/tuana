"use client"

import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiErrorWarningLine, RiMenuFold3Line, RiMenuFold4Line } from 'react-icons/ri';
import parse from 'html-react-parser';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { TbMessageCirclePlus } from 'react-icons/tb';
import useChat from '@/app/hooks/useChat';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setChatFullscreen, setSelectedChat } from '@/lib/redux/features/chatSetttings/chatSlice';
import useWidth from '@/app/hooks/useWidth';
import { useAxios } from '@/app/hooks/useAxios';
import { useAppSelector } from '@/lib/redux/hooks';


const FullsizeChatField = ({ userInfo, askQuestion }) => {
    const { width } = useWidth()

    const [collapse, setCollapse] = useState(width >= 1024 ? false : true)
    const dispatch = useDispatch()
    const selectedChat = useAppSelector((state) => state.chatSettings.selectedChat)
    const params = useSearchParams();
    const appId = params.get("id");
    const { loading: loading2, res: res2, error: error2, sendRequest: sendRequest2 } = useAxios();
    const [chatList, setChatList] = useState([])


    const handleRequest2 = async () => {
        try {
            await sendRequest2({
                method: "POST",
                url: `/api/ai/get-chat-list`,
                baseURL: process.env.NEXT_PUBLIC_AI_SERVER_URL,
                body: { appId: appId }
            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    useEffect(() => {
        if (res2 !== null) {

            if (res2.code !== 200) {


            } else {
                setChatList(res2.chatList)
            }
        }

    }, [res2, error2])

    useEffect(() => {
        handleRequest2()
    }, [])

    const {
        messages,
        partialResponse,
        loading,
        chatRights,
        inputValue,
        setInputValue,
        handleSend,
        messagesContainerRef,
        setShowRightsField,
        newChat,
        handleRequest
    } = useChat(userInfo, askQuestion, appId);


    const chatNames = [
        "Genel Sohbet",
        "Genel Sohbet",
        "Genel Sohbet",
        "Genel Sohbet",
        "Genel Sohbet",
        "Genel Sohbet",
        "Genel Sohbet",
        "Genel Sohbet",
        "Genel Sohbet",
    ]


    return (
        <div className='w-screen h-screen  bg-black/50 flex items-center justify-center fixed top-0 right-0 z-0 '>
            <div className=' lg:w-5/6 lg:h-5/6 w-full h-full rounded-md shadow-xl border border-stone-900/20 bg-main relative flex items-center'>
                <button
                    onClick={() => {
                        dispatch(setChatFullscreen(false))

                    }}
                    className="absolute top-5 right-5 z-10 group"
                >
                    <MdFullscreenExit className='text-stone-900/70  text-3xl transition-all hover:text-stone-900' />
                    <div
                        className="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100">
                        Minimize
                    </div>
                </button>


                <div className={`w-fit h-full border-r border-primary/20 bg-main lg:relative absolute z-30  ${collapse ? "hidden" : "block "}`}>
                    <div className='w-full flex items-center justify-between py-4 px-5'>
                        <div className='relative group py-1'>
                            <RiMenuFold3Line onClick={() => { setCollapse(true) }} className='text-stone-900/70 text-2xl transition-all hover:text-stone-900 cursor-pointer' />
                            <div
                                className="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100">
                                Collapse
                            </div>
                        </div>
                        <div className="relative group rounded-md border-2 border-gray-500/0 hover:border-primary px-2 py-1 text-stone-900/70 transition-all hover:bg-primary hover:text-main cursor-pointer">
                            <TbMessageCirclePlus className='text-2xl mr-1 ' onClick={()=>{newChat()}}></TbMessageCirclePlus>
                            <div
                                className="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100">
                                New Chat
                            </div>
                        </div>


                    </div>
                    <div className='w-full h-full flex flex-col items-start justify-start px-2 '>
                        {
                            chatList.map((item, index) => (
                                <div key={item._id} onClick={()=>{dispatch(setSelectedChat(item._id));handleRequest()}} className={`w-[240px] text-center cursor-pointer px-4 py-2  mb-1 rounded-md transition-all ${item._id == selectedChat ? "shadow-xl bg-primary/80 text-white" : "shadow-md bg-gray-100  hover:bg-gray-200"}`}>{item.chat_name}</div>
                            ))
                        }
                    </div>

                </div>
                <div className={` h-full overflow-hidden relative ${collapse ? "w-full" : "lg:w-5/6 w-full"}`}>

                    <div className='w-full h-[67px] flex items-center border-b border-primary/20'>
                        {
                            collapse ? (<div className='w-fit flex items-center  py-4 px-5 pr-0'>
                                <div className='relative group mr-4 py-1'>
                                    <RiMenuFold4Line onClick={() => { setCollapse(false) }} className='text-stone-900/70 text-2xl transition-all hover:text-stone-900 cursor-pointer' />
                                    <div
                                        className="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100">
                                        Expand
                                    </div>
                                </div>
                                <div className="relative group rounded-md border-2 border-gray-500/0 hover:border-primary px-2 py-1 text-stone-900/70 transition-all hover:bg-primary hover:text-main cursor-pointer">
                                    <TbMessageCirclePlus className='text-2xl mr-1 ' onClick={()=>{newChat()}}></TbMessageCirclePlus>
                                    <div
                                        className="absolute top-full left-1/2 transform
                       -translate-x-1/2 mt-2 w-max px-2 py-1 
                       text-sm text-white bg-gray-700 rounded
                       shadow-lg opacity-0 group-hover:opacity-100">
                                        New Chat
                                    </div>
                                </div>


                            </div>) : null
                        }
                        <div className="text-primary font-dosis lg:text-3xl text-2xl font-medium pl-8">
                            Ask Tuan-AI
                            <hr className="border-b-2 border-primary w-[38px]" />
                        </div>
                    </div>
                    <div className='flex-1 overflow-y-scroll h-[80%] overflow-x-hidden select-text' ref={messagesContainerRef}>
                        {/* Mesajlar */}
                        <div className='flex-1 overflow-y-auto p-4 overflow-x-hidden select-text'>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 flex lg:text-base text-sm select-text ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-1 rounded-lg shadow-md select-text ${message.sender === 'user'
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-gray-300 text-black rounded-bl-none select-text'
                                            }`}
                                    >
                                        {message.sender === 'bot' ? parse(message.text) : message.text}

                                    </div>
                                </div>
                            ))}

                            {/* Streaming yanıt sırasında gelen parçalar */}
                            {partialResponse && (
                                <div className="mb-4 flex justify-start select-text">
                                    <div className="max-w-xs px-4 py-1 rounded-lg shadow-md bg-gray-300 text-black">
                                        {parse(partialResponse)}
                                    </div>
                                </div>
                            )}

                            {/* "Yazıyor..." mesajı */}
                            {loading && (
                                <div className="mb-4 flex justify-start select-text">
                                    <div className="max-w-xs px-4 py-1 rounded-lg shadow-md text text-2xl bg-gray-300 text-primaryGray">
                                        <span><HiDotsHorizontal /></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {
                            chatRights.limitExist && (
                                chatRights.limit !== 0 ? (
                                    <div className='w-full flex items-center justify-center absolute bottom-11'>
                                        <div className="flex items-center lg:text-base text-sm  bg-main px-4 lg:py-1 rounded-tl-lg rounded-tr-lg">
                                            <RiErrorWarningLine className="text-primary" />
                                            <small className="ml-1">
                                                You have <b>{chatRights.limit}</b> chat rights
                                            </small>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-full flex items-center justify-center absolute bottom-3'>
                                        <div className="flex items-center lg:text-base text-red-500 bg-main px-4 py-1 rounded-tl-lg rounded-tr-lg">
                                            <RiErrorWarningLine />
                                            <small className="ml-1">
                                                You have <b>{chatRights.limit}</b> chat rights
                                            </small>
                                        </div>
                                    </div>
                                )
                            )
                        }






                        {/* Mesaj Gönderim Alanı */}

                        {
                            chatRights.limit !== 0 ? (
                                <div className='absolute bottom-0 w-full pb-2  px-4 bg-main rounded-md flex flex-col items-center '>

                                    <div className='flex items-end w-full'>
                                        <textarea
                                            className='w-5/6 rounded-md border mr-2 border-primaryGray/50 outline-none lg:text-lg text-base px-2 py-1 resize-none overflow-hidden'
                                            placeholder='Ask Anything...'
                                            value={inputValue}
                                            rows={1}
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setShowRightsField(true);
                                                } else {
                                                    setShowRightsField(false);
                                                }
                                                setInputValue(e.target.value);
                                                e.target.style.height = 'auto'; // Textarea'nın otomatik genişlemesi için resetlenir
                                                e.target.style.height = `${e.target.scrollHeight}px`; // Yüksekliği içerik boyutuna göre ayarlanır
                                            }}
                                            onInput={(e) => {

                                                if (!e.target.value) {
                                                    e.target.style.height = 'auto'; // Metin silinince eski yüksekliğe dön
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault(); // Enter tuşunda yeni satır eklenmez
                                                    handleSend();
                                                    e.target.style.height = 'auto';
                                                }
                                            }}
                                        />

                                        <button
                                            onClick={handleSend}
                                            className='bg-primary text-main cursor-pointer hover:bg-secondary transition-all rounded-md w-1/6 h-full flex items-center lg:text-lg text-base justify-center py-2.5'
                                        >
                                            <IoSend />
                                        </button>
                                    </div>

                                </div>
                            ) : (
                                <div></div>
                            )
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default FullsizeChatField