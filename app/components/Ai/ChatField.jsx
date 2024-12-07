import { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import io from 'socket.io-client'; // Socket.IO entegrasyonu
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import { RiErrorWarningLine } from 'react-icons/ri';

import axios from 'axios';

const socket = io(process.env.NEXT_PUBLIC_AI_SERVER_URL); // Backend bağlantısı

const ChatField = ({ userInfo }) => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: `Hi ${userInfo}, I'm Tuan-AI. How can I help you today?` }
    ]);

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false); // Loading durumu
    //const [remainChat, setRemainChat] = useState(true); // Kalan hak durumu
    const [partialResponse, setPartialResponse] = useState(''); // Streaming için parça yanıt
    const messagesContainerRef = useRef(null); // Mesaj container referansı


    const [chatRights, setChatRights] = useState({
        limit: null,
        limitExist: null
    }); // Kalan hak durumu

    const [chatAI, setChatAI] = useState(null); // Kalan hak durumu

    const params = useSearchParams();
    const appId = params.get("id");



    const handleRequest = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_SERVER_URL}/api/ai/get-ai`, {
            appId
        });
        console.log("🚀 ~ handleRequest ~ response:", response.data.data.ai)
        setChatAI(response.data.data.ai)
        //setChatRights(response.data.data.ai.limit)
        if (response.data && response.data.data && response.data.data.ai) {
            setChatRights({
                limit: response.data.data.ai.limit,
                limitExist: response.data.data.ai.limitExist
            });
        } else {
            console.error("Response data structure is not as expected");
        }
    };

    useEffect(() => {
        handleRequest()

    }, [])

    useEffect(() => {

        console.log("🚀 ~ useEffect ~ chatRights:", chatRights)

    }, [chatRights])





    const userMessageCount = messages.filter((item) => item.sender === "user").length;

    useEffect(() => {
        socket.on('ai_rights', (rights) => {
            setChatRights((prev) => ({
                ...prev,
                limit: rights
            }));
        });

    }, []);

    useEffect(() => {
        // AI'den gelen yanıt parçalarını dinle
        socket.on('ai_response', (chunk) => {
            setPartialResponse((prev) => prev + chunk);
            setLoading(false);
            setRemainChat(false)
        });

        // Yanıt tamamlandığında
        socket.on('ai_response_complete', (partialResponse) => {
            console.log("🚀 ~ socket.on ~ ai_response_complete:", partialResponse)

            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: partialResponse },
            ]);
            setPartialResponse(''); // Parçalı yanıt sıfırlanır
            setLoading(false);
            setRemainChat(true)
        });

        // Hata durumunu dinle
        socket.on('ai_response_error', (error) => {
            console.error('Error from AI:', error);
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'An error occurred while processing your request.' },
            ]);
            setPartialResponse('');
            setLoading(false);
            setRemainChat(true)
        });

        return () => {
            // Socket olaylarını temizle
            socket.off('ai_response');
            socket.off('ai_response_complete');
            socket.off('ai_response_error');
        };
    }, []);

    useEffect(() => {
        if (messages.length > 0 || partialResponse || loading) {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }
    }, [messages, partialResponse, loading]);

    const handleSend = () => {
        if (inputValue.trim()) {
            const userMessage = { sender: 'user', text: inputValue };
            setMessages((prev) => [...prev, userMessage]);
            setInputValue('');
            setLoading(true);

            // Kullanıcı mesajını backend'e gönder
            socket.emit('user_message', { appId: appId, text: inputValue });
        }
    };


    return (
        <div className='flex-1 overflow-y-scroll h-4/6 overflow-x-hidden select-text' ref={messagesContainerRef}>
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
                        <div className="flex items-center absolute bottom-11 left-1/3 bg-main px-4 py-1 rounded-tl-lg rounded-tr-lg">
                            <RiErrorWarningLine className="text-primary" />
                            <small className="ml-1">
                                You have <b>{chatRights.limit}</b> chat rights
                            </small>
                        </div>
                    ) : (
                        <div className="flex items-center absolute bottom-3 left-1/3 text-red-500 bg-main px-4 py-1 rounded-tl-lg rounded-tr-lg">
                            <RiErrorWarningLine />
                            <small className="ml-1">
                                You have <b>{chatRights.limit}</b> chat rights
                            </small>
                        </div>
                    )
                )
            }






            {/* Mesaj Gönderim Alanı */}

            {
                chatRights.limit !== 0 ? (
                    <div className='absolute bottom-0 w-full mb-2  px-4 bg-main flex flex-col items-center '>

                        <div className='flex items-end w-full'>
                            <textarea
                                className='w-5/6 rounded-md border mr-2 border-primaryGray/50 outline-none lg:text-lg text-base px-2 py-1 resize-none overflow-hidden'
                                placeholder='Ask Anything...'
                                value={inputValue}
                                rows={1}
                                onChange={(e) => {
                                    if (e.target.value == "") {
                                        setRemainChat(true)
                                    } else {
                                        setRemainChat(false)
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
    );
};

export default ChatField;
