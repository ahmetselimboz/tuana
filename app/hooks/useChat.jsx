import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addMessage, clearMessages, resetMessages, setMessages, setSelectedChat } from "@/lib/redux/features/chatSetttings/chatSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { useAxios } from "./useAxios";
import { useSearchParams } from "next/navigation";
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast";

const socket = io(process.env.NEXT_PUBLIC_AI_SERVER_URL, {
    reconnection: true,
    timeout: 20000,
});

const useChat = (userInfo, askQuestion, appId) => {
    //const [messages, setMessages] = useState([
    //     { sender: "bot", text: `Hi ${userInfo}, I'm Tuan-AI. How can I help you today?` },
    // ]);
    const messages = useAppSelector((state) => state.chatSettings.messages);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [showRightsField, setShowRightsField] = useState(true);
    const [partialResponse, setPartialResponse] = useState("");
    const messagesContainerRef = useRef(null);
    const [chatRights, setChatRights] = useState({ limit: null, limitExist: null });
    const [chatAI, setChatAI] = useState(null);
    const dispatch = useDispatch()

    const selectedChat = useAppSelector((state) => state.chatSettings.selectedChat)
    const isChatFullscreen = useAppSelector((state) => state.chatSettings.isChatFullscreen)
    const { loading2, res, error, sendRequest } = useAxios();
    const { toast } = useToast()

    const handleRequest = async () => {
        try {
            await sendRequest({
                method: "POST",
                url: `/api/ai/get-ai`,
                baseURL: process.env.NEXT_PUBLIC_AI_SERVER_URL,
                body: { appId: appId, selectedChat: selectedChat }
            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    useEffect(() => {
        handleRequest()
    }, [isChatFullscreen, selectedChat])

    useEffect(() => {

        if (res !== null) {
            if (res.code !== 200) {

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: res?.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            } else {
                console.log("Resss  ", res )
                console.log("🚀 ~ useChat ~ res:", res)
                if (res && res.ai) {
                    setChatAI(res.ai);
                    setChatRights({
                        limit: res.ai.limit,
                        limitExist: res.ai.limitExist,
                    });
                   
                    if (res.messages && res.messages.length > 0) {
                        // if (selectedChat == "671ccea647949c3fab28fb81") {
                        //     dispatch(setSelectedChat(res.chatId))
                        // }
                        //setMessages([])
                        dispatch(resetMessages());
                        const botMessage = { sender: "bot", text: `Hi, I'm Tuan-AI. How can I help you today?` };
                       
                        const messages = res.messages.map((message) => ({
                            sender: message.sender,
                            text: message.message,
                            id: message._id?.$oid || Date.now(),
                        }));
                        // setMessages((prev) => [botMessage, ...messages]);
                        dispatch(setMessages([botMessage, ...messages])); 
                    }
                }
            }
        }

    }, [res, error])





    const handleSend = () => {
        if (inputValue.trim()) {
            if (inputValue.trim().length === 0) {
                handleBotMessage("Please do not leave blank");
                setInputValue("");
                return;
            }

            const userMessage = { sender: "user", text: inputValue, id: Date.now() };
            dispatch(addMessage(userMessage)); // Redux'a mesaj ekle
            //setMessages((prev) => [...prev, userMessage]);
            setInputValue("");
            setLoading(true);

            socket.emit("user_message", { appId, text: inputValue, selectedChat: selectedChat });
        }
    };

    const handleBotMessage = (text) => {
        //setMessages((prev) => [...prev, { sender: "bot", text, id: Date.now() }]);
        const botMessage = { sender: "bot", text, id: Date.now() }
        dispatch(addMessage(botMessage)); // Redux'a bot mesajı ekle
    };

    useEffect(() => {
        //handleRequest()

        socket.on("connect", () => console.log("Connected to server"));

  

        socket.on("ai_response", (chunk) => {
            setPartialResponse((prev) => prev + chunk);
            setLoading(false);
            setShowRightsField(false);
        });

        socket.on("ai_response_complete", (response) => {
            console.log("🚀 ~ socket.on ~ response:", response)
            handleBotMessage(response.partialResponse);
            dispatch(setSelectedChat(response.newChatId))
            setPartialResponse("");
            setLoading(false);
            setShowRightsField(true);
        });

        socket.on("ai_response_error", (error) => {
            console.error("Error from AI:", error);
            handleBotMessage("An error occurred while processing your request.");
            setPartialResponse("");
            setLoading(false);
            setShowRightsField(true);
        });

        return () => {
            socket.off("connect");
            socket.off("ai_rights");
            socket.off("ai_response");
            socket.off("ai_response_complete");
            socket.off("ai_response_error");
        };
    }, []);

    useEffect(()=>{
        socket.on("ai_rights", (rights) => {
            console.log("🚀 ~ socket.on ~ rights:", rights)
            setChatRights((prev) => ({ ...prev, limit: rights }));
        });
    },[socket])

    useEffect(() => {
        setInputValue(askQuestion);
        handleSend()
    }, [askQuestion]);

    useEffect(() => {
        if (messages.length > 0 || partialResponse || loading) {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }
    }, [messages, partialResponse, loading]);


    const newChat = async () => {
        dispatch(clearMessages());
        // setMessages([
        //     { sender: "bot", text: `Hi ${userInfo}, I'm Tuan-AI. How can I help you today?` },
        // ])
        dispatch(setSelectedChat("65c40fec35d43d01a2a6d1e5"))
    }


    useEffect(()=>{
        console.log("🚀 ~ chatRights:", chatRights)
    },[chatRights])

    return {
        messages,
        partialResponse,
        loading,
        chatRights,
        inputValue,
        setInputValue,
        handleSend,
        messagesContainerRef,
        setShowRightsField,
        chatAI,
        showRightsField,
        newChat,
        handleRequest
    };
};

export default useChat;
