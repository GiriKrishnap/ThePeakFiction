const express = require('express');
const router = express.Router();

/////controller///////////////////////
const adminController = require('../controller/adminController');

//////User Routes///////////////////

//get----------------------------------------------
router.get('/getAllUsers', adminController.getAllUsers);
router.get('/getAllAuthors', adminController.getAllAuthors);
router.get('/getAllGenres', adminController.getAllGenres);
router.get('/image/:id', adminController.getImage);
router.get('/getAllNovels', adminController.getAllNovels);

//post----------------------------------------------
router.post('/login', adminController.adminLogin);
router.post('/addGenre', adminController.addGenre);
router.post('/approve', adminController.giveApprove);

module.exports = router;