const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const novelSchema = mongoose.Schema({
    //..................................
    cover: {
        type: String,
    },
    //..................................
    author_id: {
        type: ObjectId,
        ref: 'AuthorData'
    },
    //..................................
    title: {
        type: String,
        require: true,
        unique: true
    },
    //..................................
    description: {
        type: String,
        require: true,
    },
    //..................................
    genre: [{

        type: ObjectId,
        ref: "GenreData",

    }],
    //..................................
    status: {
        type: String,
        require: true,
        default: "pending"
    },
    //..................................
    publish_date: {
        type: Date,
        require: true,
    },
    //..................................
    updated_date: {
        type: Date,
        require: true
    },
    //..................................
    rate: {
        type: Number,
        require: true,
        default: 0
    },
    //..................................
    in_library: {
        type: Number,
        require: true,
        default: 0
    },
    //..................................
    views: {
        type: Number,
        default: 0
    },
    //..................................
    is_hide: {
        type: Boolean,
        default: false
    },
    //..................................
    chapters: [{
        number: {
            type: Number
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        publish_date: {
            type: Date,
        },
        gcoin: {
            type: Number,
            default: 0
        }
    }],
    //..................................
    chapter_count: {
        type: Number,
        default: 0
    },
    //..................................
    gcoin_system: {
        type: Boolean,
        default: false
    }
    //..................................
})

module.exports = mongoose.model('NovelsData', novelSchema);
