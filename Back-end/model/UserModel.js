const mongoose = require('mongoose');

const User = new mongoose.Schema({
    //..................................
    userName: {
        type: String,
        require: true
    },
    //..................................
    email: {
        type: String,
        unique: true,
        require: true
    },
    //..................................
    password: {
        type: String,
        require: true
    },
    //..................................
    is_Block: {
        type: Boolean,
        default: false
    },
    //..................................
    is_Author: {
        type: Boolean,
        default: false
    }
});

const model = mongoose.model('UserData', User);

module.exports = model;