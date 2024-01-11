//.................................................................
const express = require('express');
const router = express.Router();
//.................................................................
const { protect } = require('../middlewares/verifyToken');
//.................................................................
const userController = require('../controller/userController');
const paymentController = require('../controller/paymentController');
const novelController = require('../controller/novelController');


//GET METHODS..........................................................
router.get('/novelWithId/:novelId', protect, novelController.getNovelWithId);
router.get('/getAllNovels-user', protect, novelController.getAllNovels);
router.get('/get-library', protect, novelController.getLibraryNovels);
router.get('/getMostViewed', protect, novelController.getMostViewed);
router.get('/getNewUpdated', protect, novelController.getNewUpdated);
router.get('/getTrending', protect, novelController.getTrending);
router.get('/getRandom', protect, novelController.getRandom);
router.get('/getWallet', protect, userController.getWallet);
router.get('/check-GCoinSystem', protect, novelController.checkGCoinSystem);

//POST METHODS..........................................................
router.post('/signup', userController.readerSignup);
router.post('/login', userController.readerLogin);
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/add-To-library', protect, novelController.addToLibrary);
router.post('/filterNovels-user', protect, novelController.filterNovel);
router.post('/payment-confirm', paymentController.confirmPayment);
router.post('/rateNovel', protect, novelController.addRating);

///---------------------------
module.exports = router;
