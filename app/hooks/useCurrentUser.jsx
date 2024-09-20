"use client"

import { useEffect, useRef, useState } from 'react';
import socket from '@/lib/socket/socket';

const useCurrentUser = (appId) => {
  const [activeUsers, setActiveUsers] = useState([]);
  

  useEffect(() => {
    if (!socket) return;
  
    socket.emit("joinRoom", appId);

    socket.emit("getActiveUsers", appId)

    socket.on("activeUsers", (users) => {
      
      setActiveUsers(users);
    });


    return () => {
      socket.emit("leaveRoom", appId);
    };
  }, [setActiveUsers]);


  return { activeUsers };
};

export default useCurrentUser;
