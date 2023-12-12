const mongoose = require('mongoose');

const Reader = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    is_Block: {
        type: Boolean,
        default: false
    }
});

const model = mongoose.model('ReaderData', Reader);

module.exports = model;