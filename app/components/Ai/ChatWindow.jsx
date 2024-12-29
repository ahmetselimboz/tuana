import React, { useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiErrorWarningLine } from 'react-icons/ri';
import parse from 'html-react-parser';

const ChatWindow = ({
  messages,
  partialResponse,
  loading,
  chatRights,
  inputValue,
  setInputValue,
  handleSend,
  setShowRightsField,
  messagesContainerRef
}) => {
  
  //const messagesContainerRef = useRef();

  return (
    <div className='flex-1 overflow-y-scroll custom-scrollbar h-4/6 overflow-x-hidden select-text' ref={messagesContainerRef}>
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
          <div className='absolute bottom-0 w-full mb-2  px-4 bg-main rounded-md flex flex-col items-center '>

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
  );
};

export default ChatWindow;
