const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'novelCovers')));
mongoose.connect(process.env.CONNECTION_STRING);

const userRoute = require('./route/userRoute');
const adminRoute = require('./route/adminRoute');

//Routes
app.use('/', userRoute);
app.use('/admin', adminRoute);


app.listen(4000, () => {
    console.log("server started at port 4000");
});