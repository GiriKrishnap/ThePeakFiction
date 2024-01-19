//.................................................................
const express = require('express');
const router = express.Router();
//.................................................................
const { protect } = require('../middlewares/verifyToken');
//.................................................................
const adminController = require('../controller/adminController');



//GET METHODS..........................................................
router.get('/getAllUsers', protect, adminController.getAllUsers);
router.get('/getAllAuthors', protect, adminController.getAllAuthors);
router.get('/getAllGenres', protect, adminController.getAllGenres);
router.get('/image/:id', adminController.getImage);
router.get('/getAllNovels', protect, adminController.getAllNovels);


//POST METHODS..........................................................
router.post('/login', adminController.adminLogin);
router.post('/addGenre', protect, adminController.addGenre);
router.post('/approve', protect, adminController.giveApprove);
router.post('/hideNovel', protect, adminController.hideNovel);
router.post('/block-user', protect, adminController.blockUser);
router.post('/list-genre', protect, adminController.listGenre);


module.exports = router;