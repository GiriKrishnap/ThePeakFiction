// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/NovelCovers/');
    },
    filename: function (req, file, cb) {
        const NovelFileName = `${req.body.title}.jpeg`;
        cb(null, NovelFileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
