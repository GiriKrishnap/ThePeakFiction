//.................................................................
const express = require('express');
const router = express.Router();
const multer = require('../util/multerConfig');
//.................................................................
const { protect } = require('../middlewares/verifyToken');
const novelExistChecker = require('../middlewares/novelCreateMiddleware');
//.................................................................
const authorController = require('../controller/AuthorController');
const novelController = require('../controller/novelController');


//GET METHODS..........................................................
router.get('/getAuthorNovels/:id', protect, authorController.getAllAuthorNovels);
router.get('/getGenres', protect, authorController.getAllGenresAuthor);
router.get('/edit-chapter-details', protect, authorController.chapterEditDetails);

//POST METHODS..........................................................
router.post('/create/:title', protect, novelExistChecker, multer.single('photo'), authorController.authorCreate);
router.post('/addChapter', protect, authorController.addChapter);
router.post('/payment-Eligible-Check', protect, authorController.paymentEligibleCheck);
router.post('/cancel-novel', protect, authorController.cancelNovel);
router.post('/delete-chapter', protect, authorController.deleteChapter);
router.post('/edit-chapter', protect, authorController.chapterEditPost);


module.exports = router;