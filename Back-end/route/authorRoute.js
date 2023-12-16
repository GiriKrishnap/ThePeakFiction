const express = require('express');
const router = express.Router();
const multer = require('../util/multerConfig');
const novelExistChecker = require('../middlewares/novelCreateMiddleware');
/////controller///////////////////////
const authorController = require('../controller/AuthorController');


//////User Routes///////////////////
router.post('/create/:title', novelExistChecker, multer.single('photo'), authorController.authorCreate);


module.exports = router;