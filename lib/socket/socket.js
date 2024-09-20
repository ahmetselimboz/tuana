import { io } from "socket.io-client";

//const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
const socket = io("https://server.tuanalytics.xyz");

export default socket;