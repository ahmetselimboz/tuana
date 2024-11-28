import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

const ChatField = () => {
    const [messages, setMessages] = useState([
        { sender: 'AI', text: 'Hello! How can I help you?' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { sender: 'User', text: inputValue }]);
            setInputValue('');
            // AI'ye yanıt oluşturma (Örnek yanıt)
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'AI', text: 'This is an automatic response.' }
                ]);
            }, 1000);
        }
    };

    return (
        <div className='flex-1 overflow-y-scroll  h-4/6'>

            <div className='flex-1 overflow-y-auto p-4'>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`max-w-xs px-4 py-1 rounded-lg shadow-md ${message.sender === 'User'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-gray-300 text-black rounded-bl-none'
                                }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>


            <div className='absolute bottom-0 w-full mb-2 flex items-center px-4'>
                <input type="text"
                    className='w-5/6 rounded-md border mr-2 border-primaryGray/50 outline-none text-lg px-2 py-1'
                    placeholder='Ask Anything...'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }} />
                <button onClick={handleSend} className='bg-primary text-main cursor-pointer hover:bg-secondary transition-all rounded-md w-1/6 h-full flex items-center text-lg justify-center py-2.5'>
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default ChatField;
