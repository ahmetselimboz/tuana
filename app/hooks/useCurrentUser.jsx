

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const useCurrentUser = (url, appId) => {
  const socketRef = useRef(null);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {

    const socket = io(url);
    socketRef.current = socket;

    socket.emit('register', appId);

    socket.on('activeUsers', (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, appId]);

  return { activeUsers };
};

export default useCurrentUser;
