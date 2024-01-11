const express = require('express');
const router = express.Router();

//////////////////////////////////////////////////////////////
const { protect } = require('../middlewares/verifyToken');

/////controller///////////////////////
const adminController = require('../controller/adminController');


// .................{LOGIN}...................................
router.post('/login', adminController.adminLogin);

// .................{USERS}...................................
//get
router.get('/getAllUsers', protect, adminController.getAllUsers);

//.................{AUTHORS}...................................
//get
router.get('/getAllAuthors', protect, adminController.getAllAuthors);

//.................{GENRE}...................................
//get
router.get('/getAllGenres', protect, adminController.getAllGenres);

//post
router.post('/addGenre', protect, adminController.addGenre);

//.................{NOVELS}...................................
//get
router.get('/image/:id', adminController.getImage);
router.get('/getAllNovels', protect, adminController.getAllNovels);

//post
router.post('/approve', protect, adminController.giveApprove);
router.post('/hideNovel', protect, adminController.hideNovel);



module.exports = router;