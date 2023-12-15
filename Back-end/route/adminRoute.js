const express = require('express');
const router = express.Router();

/////controller///////////////////////
const adminController = require('../controller/adminController');

//////User Routes///////////////////
router.post('/login', adminController.adminLogin);
router.get('/getAllUsers', adminController.getAllUsers);
router.get('/getAllAuthors', adminController.getAllAuthors);

module.exports = router;