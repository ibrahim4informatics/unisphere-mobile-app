import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
    console.log("Connecting with token:", token);

    socket = io(process.env.EXPO_PUBLIC_API_URL, {
        auth: { token },
        transports: ["websocket"], // important for RN
        autoConnect: true,
    });
    console.log(socket)
    socket.on("connect", () => console.log("✅ Connected:", socket?.id));
    socket.on("connect_error", (err) => console.log("❌ Connect error:", err.message));
    socket.on("disconnect", () => console.log("⚠️ Disconnected"));

    return socket;
};

export const getSocket = () => socket;


export const refreshSocketToken = (new_token: string) => {
    if (!socket) return;
    socket.auth = { token: new_token };
    socket.disconnect();
    socket.connect();
}

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};


const s = getSocket();
if (s) {

    s.on("connect", () => {
        console.log("✅ Socket connected:", socket?.id);
    });

    s.on("connect_error", (err) => {
        console.log("❌ Connection error:", err.message);
    });

}