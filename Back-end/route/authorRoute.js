const express = require('express');
const router = express.Router();
const multer = require('../util/multerConfig');
const novelExistChecker = require('../middlewares/novelCreateMiddleware');

//////////////////////////////////////////////////////////////
const { protect } = require('../middlewares/verifyToken');

/////controller///////////////////////
const authorController = require('../controller/AuthorController');


//get.....................................
router.get('/getAuthorNovels/:id', protect, authorController.getAllAuthorNovels);

//Post.....................................
router.post('/create/:title', protect, novelExistChecker, multer.single('photo'), authorController.authorCreate);
router.post('/addChapter', protect, authorController.addChapter);


module.exports = router;