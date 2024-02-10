// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Handle potential errors
        if (!file) {
            console.log('No file received');
            return cb(new Error('No file received'));
        }
        cb(null, '/public/NovelCovers/');
    },
    filename: function (req, file, cb) {
        // Handle potential errors
        if (!file || !req.body.title) {
            console.log('Invalid file or missing title')
            return cb(new Error('Invalid file or missing title'));
        }
        // Dynamically determine file extension based on MIME type
        const fileExtension = file.mimetype.split('/')[1];
        console.log(fileExtension);
        const novelFileName = `${req.body.title}.${fileExtension}`;
        cb(null, novelFileName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
