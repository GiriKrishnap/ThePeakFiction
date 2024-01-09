const mongoose = require('mongoose');

const Wallet = new mongoose.Schema({
    //..................................
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        require: true
    },
    //..................................
    walletAmount: {
        type: Number,
        default: 0
    },
    //..................................
    amountAdd: [{
        amount: {
            type: Number,
        },
        //----------------
        date: {
            type: Date,
        }
        //----------------
    }],
    //..................................
    amountUse: [{
        amount: {
            type: Number,
        },
        //----------------
        novel: {
            type: mongoose.Schema.Types.ObjectId,
        },
        //----------------
        chapterNo: {
            type: Number
        },
        //----------------
        date: {
            type: Date,
        }
        //----------------
    }],
    //..................................
});

const model = mongoose.model('WalletData', Wallet);

module.exports = model;