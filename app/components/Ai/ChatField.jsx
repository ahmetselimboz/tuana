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

  
};

export default ChatField;
