const mongoose = require('mongoose');

const Wallet = new mongoose.Schema({
    //..................................
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReaderData",
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
    }
    //..................................
});

const model = mongoose.model('WalletData', Wallet);

module.exports = model;