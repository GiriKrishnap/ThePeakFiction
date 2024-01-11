//.................................................................
const express = require('express');
const router = express.Router();
const multer = require('../util/multerConfig');
//.................................................................
const { protect } = require('../middlewares/verifyToken');
const novelExistChecker = require('../middlewares/novelCreateMiddleware');
//.................................................................
const authorController = require('../controller/AuthorController');


//GET METHODS..........................................................
router.get('/getAuthorNovels/:id', protect, authorController.getAllAuthorNovels);

//POST METHODS..........................................................
router.post('/create/:title', protect, novelExistChecker, multer.single('photo'), authorController.authorCreate);
router.post('/addChapter', protect, authorController.addChapter);


module.exports = router;