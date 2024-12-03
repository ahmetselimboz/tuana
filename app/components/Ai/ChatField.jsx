import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { IoSend } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import { HiDotsHorizontal } from 'react-icons/hi';

const ChatField = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hi, I'm Tuan-AI. I'm here for you. How can I help you?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false); // Loading durumu

    const params = useSearchParams();
    const appId = params.get("id");

    const messagesContainerRef = useRef(null); // Mesajlar container referansı

    useEffect(() => {
        if ((messages.length > 0 && messages[messages.length - 1].sender === 'user') || loading == true) {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }
    }, [messages, loading]); // Mesajlar değiştiğinde, sadece son mesaj 'user' ise scrollu aşağıya kaydır


    useEffect(() => {

        console.log("🚀 ~ ChatField ~ messages:", messages)
    }, [messages])

    // Mesaj gönderme ve bot yanıtı
    const handleSend = async () => {
        if (inputValue.trim()) {
            const userMessage = { sender: 'user', text: inputValue };
            setMessages((prev) => [...prev, userMessage]);

            setInputValue('');

            setTimeout(() => {
                setLoading(true);
            }, 1000);

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_SERVER_URL}/api/ai/prompt`, { appId, prompt: inputValue });
                console.log("🚀 ~ handleSend ~ response:", response);
                const botResponse = response.data.data.response || 'This is an automatic response.';

                // Bot yanıtı geldikten sonra loading'i false yap
                setLoading(false);

                setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
            } catch (error) {
                console.error('Error sending message:', error);
                setMessages((prev) => [
                    ...prev,
                    { sender: 'bot', text: 'Sorry, something went wrong!' }
                ]);
                setLoading(false); // Hata durumunda da loading'i false yap
            }
        }
    };

    return (
        <div className='flex-1 overflow-y-scroll h-4/6 overflow-x-hidden' ref={messagesContainerRef}>
            {/* Mesajlar */}
            <div className='flex-1 overflow-y-auto p-4 overflow-x-hidden' >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs px-4 py-1 rounded-lg shadow-md ${message.sender === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-gray-300 text-black rounded-bl-none'
                                }`}
                        >
                            {message.sender === 'bot' ? parse(message.text) : message.text}
                        </div>
                    </div>
                ))}

                {/* "Yazıyor..." mesajı */}
                {loading && (
                    <div className="mb-4 flex justify-start">
                        <div className="max-w-xs px-4 py-1 rounded-lg shadow-md text text-2xl bg-gray-300 text-primaryGray">
                            <span><HiDotsHorizontal /></span>
                        </div>
                    </div>
                )}
                {/* Mesajların en sonuna referans */}

            </div>

            {/* Mesaj Gönderim Alanı */}
            <div className='absolute bottom-0 w-full mb-2 flex items-end px-4 bg-main'>
                <textarea
                    className='w-5/6 rounded-md border mr-2 border-primaryGray/50 outline-none text-lg px-2 py-1 resize-none overflow-hidden'
                    placeholder='Ask Anything...'
                    value={inputValue}
                    rows={1}
                    onChange={(e) => {
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
                    className='bg-primary text-main cursor-pointer hover:bg-secondary transition-all rounded-md w-1/6 h-full flex items-center text-lg justify-center py-2.5'
                >
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default ChatField;
