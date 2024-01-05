////////////////////////////////////////
const express = require('express');
const router = express.Router();
/////controller///////////////////////
const userController = require('../controller/userController');
const paymentController = require('../controller/paymentController');


//////User Routes///////////////////////////////////
router.post('/signup', userController.readerSignup);
router.post('/login', userController.readerLogin);

//home..........................................................
router.get('/getMostViewed', userController.getMostViewed);
router.get('/getTrending', userController.getTrending);
router.get('/getRandom', userController.getRandom);

//filter...........................................................
router.post('/filterNovels-user', userController.filterNovel);
router.get('/getAllNovels-user', userController.getAllNovels);

//novelDetails.....................................................
router.get('/novelWithId/:novelId', userController.getNovelWithId);

//PAYMENT..........................................................
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/payment-confirm', paymentController.confirmPayment);


///---------------------------
module.exports = router;
