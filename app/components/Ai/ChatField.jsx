import { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import io from 'socket.io-client'; // Socket.IO entegrasyonu
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import { RiErrorWarningLine } from 'react-icons/ri';

import axios from 'axios';
import ChatWindow from './ChatWindow';

const socket = io(process.env.NEXT_PUBLIC_AI_SERVER_URL, {
    reconnection: true, // Yeniden bağlanma açık
    reconnectionAttempts: 5, // Maksimum 5 yeniden bağlanma denemesi
    reconnectionDelay: 1000, // Yeniden bağlanma denemeleri arasındaki süre (ms)
}); // Backend bağlantısı

const ChatField = ({ userInfo, isFullScreen }) => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: `Hi ${userInfo}, I'm Tuan-AI. How can I help you today?` }
    ]);

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false); // Loading durumu
    const [showRightsField, setShowRightsField] = useState(true); // Kalan hak durumu
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
        // console.log("🚀 ~ handleRequest ~ response:", response.data.data.ai)
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

    }, [messages])

    useEffect(() => {

        //   console.log("🚀 ~ useEffect ~ chatRights:", chatRights)

    }, [chatRights])







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
            setShowRightsField(false)
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
            setShowRightsField(true)
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
            setShowRightsField(true)
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
        <ChatWindow
            messages={messages}
            partialResponse={partialResponse}
            loading={loading}
            chatRights={chatRights}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
            showRightsField={showRightsField}
            setShowRightsField={setShowRightsField}
            isFullScreen={isFullScreen}
        />
    );
};

export default ChatField;
