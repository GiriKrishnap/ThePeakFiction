const express = require('express');
const router = express.Router();

/////controller///////////////////////
const readerController = require('../controller/readerController');

//////User Routes///////////////////
router.post('/signup', readerController.readerSignup);
router.post('/login', readerController.readerLogin);

//home--------
router.get('/getMostViewed', readerController.getMostViewed);
router.get('/getTrending', readerController.getTrending);
router.get('/getRandom', readerController.getRandom);

//filter--------
router.post('/filterNovels-user', readerController.filterNovel);
router.get('/getAllNovels-user', readerController.getAllNovels);

//novelDetails----------
router.get('/novelWithId/:novelId', readerController.getNovelWithId);

module.exports = router;
