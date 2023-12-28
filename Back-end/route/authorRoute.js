const express = require('express');
const router = express.Router();
const multer = require('../util/multerConfig');
const novelExistChecker = require('../middlewares/novelCreateMiddleware');
/////controller///////////////////////
const authorController = require('../controller/AuthorController');


//get.....................................
router.get('/getAuthorNovels/:id', authorController.getAllAuthorNovels);

//Post.....................................
router.post('/create/:title', novelExistChecker, multer.single('photo'), authorController.authorCreate);
router.post('/addChapter', authorController.addChapter);


module.exports = router;