// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Handle potential errors
        if (!file) {
            return cb(new Error('No file received'));
        }
        cb(null, 'public/NovelCovers/');
    },
    filename: function (req, file, cb) {
        // Handle potential errors
        if (!file || !req.body.title) {
            return cb(new Error('Invalid file or missing title'));
        }
        // Dynamically determine file extension based on MIME type
        const fileExtension = file.mimetype.split('/')[1];
        const novelFileName = `${req.body.title}.${fileExtension}`;
        cb(null, novelFileName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
