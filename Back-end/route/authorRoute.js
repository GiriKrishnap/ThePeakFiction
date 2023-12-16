const express = require('express');
const router = express.Router();
const multer = require('../util/multerConfig');


/////controller///////////////////////
const authorController = require('../controller/AuthorController');


//////User Routes///////////////////
router.post('/create', multer.single('photo'), authorController.authorCreate);


module.exports = router;