"use client"

import { useEffect, useRef, useState } from 'react';
import socket from '@/lib/socket/socket';

const useCurrentUser = (appId) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", appId);

    socket.emit("getActiveUsers", appId)

    socket.on("activeUsers", (users) => {
      console.log("🚀 ~ socket.on ~ users:", users)
      setActiveUsers(users);
      setTimeout(() => {
        setLoading(false);
      }, "1000")
    });

    return () => {
      socket.emit("leaveRoom", appId);
    };
  }, [setActiveUsers]);


  return { activeUsers, loading };
};

export default useCurrentUser;
