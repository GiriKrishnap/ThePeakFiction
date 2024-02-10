// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('multer cover - ', req?.body?.cover);
        if (!req.body.cover) {
            console.log("hello -------------------")
            cb(null, 'public/NovelCovers/');
        }
    },
    filename: function (req, file, cb) {
        if (!req.body.cover) {
            console.log("hello2 ------------------")
            const NovelFileName = `${req.body.title}.jpeg`;
            cb(null, NovelFileName);
        }
    },
})

const upload = multer({ storage: storage });

module.exports = upload;
