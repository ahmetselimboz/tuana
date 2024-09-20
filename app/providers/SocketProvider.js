// "use client"
// import { setCurrentVisitor } from "@/lib/redux/features/appSettings/appsSlice";
// import { useAppSelector } from "@/lib/redux/hooks";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useDispatch } from "react-redux";
// import io, { Socket } from "socket.io-client";
// import useCurrentUser from "../hooks/useCurrentUser";
// import socket from "@/lib/socket/socket";

// const SocketContext = createContext();

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
 
//   const appId = useAppSelector((state) => state.appsSettings.appId);
//   const dispatch = useDispatch()
//   const [activeUsers, setActiveUsers] = useState([]);


//   useEffect(() => {
//     if (!socket) return;
   
//     socket.emit("joinRoom", appId);

//     socket.emit("getActiveUsers", appId)

//     socket.on("activeUsers", (users) => {
//       console.log("Active Users received:", users);
//       setActiveUsers(users);
//       dispatch(setCurrentVisitor(users?.length))
//     });
    

  
//     return () => {
//       socket.emit("leaveRoom", appId);
//     };
//   }, [activeUsers, appId]);

//   return (
//     <SocketContext.Provider value={activeUsers}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
