const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const { Server } = require("socket.io");
require('dotenv/config');
const http = require("http");
//................................................................
//Database
dbConnect()

//................................................................

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'novelCovers')));


//................................................................

const userRoute = require('./route/userRoute');
const adminRoute = require('./route/adminRoute');
const authorRoute = require('./route/AuthorRoute');

//Routes...........................................................

app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use('/author', authorRoute);

//................................................................

app.use(express.json());

//................................................................


const server = http.createServer(app);

//................................................................

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }, 
});

// Socket connection logic
io.on("connection", (socket) => {
    console.log('connect')
    socket.on("join_room", (room) => {
        console.log(' - - Joined The Room - - ', room)
        socket.join(room);
    });
    
    // sending new message through socket io
    socket.on("send_message", (data) => {
        const { novelId } = data;
        console.log("📤📤📤📤📤data is here - ", data.message)
        socket.to(novelId).emit("Message_received", data);

    });

    // handling disconnect function
    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
    });
    
});

//................................................................
server.listen(4000, () => {
    console.log("server started at port 4000");
});  