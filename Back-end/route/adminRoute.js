const express = require('express');
const router = express.Router();

/////controller///////////////////////
const adminController = require('../controller/adminController');

//////User Routes///////////////////
router.post('/login', adminController.adminLogin);
router.post('/getAllUsers', adminController.getAllUsers);

module.exports = router;