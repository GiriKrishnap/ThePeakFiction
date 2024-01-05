const express = require('express');
const router = express.Router();


/////controller///////////////////////
const adminController = require('../controller/adminController');


// .................{LOGIN}...................................
router.post('/login', adminController.adminLogin);

// .................{USERS}...................................
//get
router.get('/getAllUsers', adminController.getAllUsers);

//.................{AUTHORS}...................................
//get
router.get('/getAllAuthors', adminController.getAllAuthors);

//.................{GENRE}...................................
//get
router.get('/getAllGenres', adminController.getAllGenres);

//post
router.post('/addGenre', adminController.addGenre);

//.................{NOVELS}...................................
//get
router.get('/image/:id', adminController.getImage);
router.get('/getAllNovels', adminController.getAllNovels);

//post
router.post('/approve', adminController.giveApprove);
router.post('/hideNovel', adminController.hideNovel);



module.exports = router;