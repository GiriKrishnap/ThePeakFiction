const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const communitySchema = mongoose.Schema({
    //..................................
    name: {
        type: String,
    },
    //..................................
    novel_id: {
        type: ObjectId,
        ref: "NovelsData"
    },
    //..................................
    members: [
        {
            type: ObjectId,
            ref: "UserData",
        }
    ],
    //..................................
    messages: [{

        user_id: {
            type: ObjectId,
            ref: "UserData",
        },
        //-----------
        message: {
            type: String,
            trim: true
        },
        //-----------
        date: {
            type: Date,
            require: true,
        }
    }],
    //..................................

})

module.exports = mongoose.model('CommunityData', communitySchema);
