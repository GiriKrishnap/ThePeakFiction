import io from "socket.io-client";

const initializeSocket = () => {
    const socket = io.connect("https://pureglow.live");
    return socket;
};

export { initializeSocket };