import io from "socket.io-client";

const initializeSocket = () => {
    const socket = io.connect("https://thepeakfiction.onrender.com");
    return socket;
};

export { initializeSocket };