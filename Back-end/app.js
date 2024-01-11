const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
require('dotenv/config');
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

app.listen(4000, () => {
    console.log("server started at port 4000");
});

//................................................................