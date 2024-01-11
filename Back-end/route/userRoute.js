////////////////////////////////////////
const express = require('express');
const router = express.Router();

//////////////////////////////////////////////////////////////
const { protect } = require('../middlewares/verifyToken');

/////controller///////////////////////
const userController = require('../controller/userController');
const paymentController = require('../controller/paymentController');
const novelController = require('../controller/novelController');


//////User Routes///////////////////////////////////
router.post('/signup', userController.readerSignup);
router.post('/login', userController.readerLogin);

//home..........................................................
router.get('/getMostViewed', protect, novelController.getMostViewed);
router.get('/getNewUpdated', protect, novelController.getNewUpdated);
router.get('/getTrending', protect, novelController.getTrending);
router.get('/getRandom', protect, novelController.getRandom);
router.get('/get-library', protect, novelController.getLibraryNovels);
router.post('/add-To-library', protect, novelController.addToLibrary);

//filter...........................................................
router.post('/filterNovels-user', protect, novelController.filterNovel);
router.get('/getAllNovels-user', protect, novelController.getAllNovels);

//novelDetails.....................................................
router.get('/novelWithId/:novelId', protect, novelController.getNovelWithId);

//Rating.....................................................
router.post('/rateNovel', protect, novelController.addRating);

//PAYMENT..........................................................
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/payment-confirm', paymentController.confirmPayment);
router.get('/userById', userController.getWallet);


///---------------------------
module.exports = router;
