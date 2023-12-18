const express = require('express');
const router = express.Router();

/////controller///////////////////////
const adminController = require('../controller/adminController');

//////User Routes///////////////////
router.post('/login', adminController.adminLogin);
router.get('/getAllUsers', adminController.getAllUsers);
router.get('/getAllAuthors', adminController.getAllAuthors);
router.get('/getAllGenres', adminController.getAllGenres);
router.post('/addGenre', adminController.addGenre);
router.get('/image/:id', adminController.getImage);
router.get('/getAllNovels', adminController.getAllNovels);

module.exports = router;