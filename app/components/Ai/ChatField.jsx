import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'; // Socket.IO entegrasyonu
import { useSearchParams } from 'next/navigation';
import { IoSend } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';
import parse from 'html-react-parser';
import { RiErrorWarningLine } from 'react-icons/ri';

import axios from 'axios';
import ChatWindow from './ChatWindow';
import FullsizeChatField from './FullsizeChatField';
import useChat from '@/app/hooks/useChat';



const ChatField = ({ userInfo, askQuestion }) => {

    const params = useSearchParams();
    const appId = params.get("id");
  
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
      showRightsField,
    } = useChat(userInfo, askQuestion, appId);

 

    return (
        <ChatWindow
            messages={messages}
            partialResponse={partialResponse}
            loading={loading}
            chatRights={chatRights}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
            setShowRightsField={setShowRightsField}
            messagesContainerRef={messagesContainerRef}
        />
    );
};

export default ChatField;
