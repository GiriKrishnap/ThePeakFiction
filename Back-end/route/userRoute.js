const express = require('express');
const router = express.Router();

/////controller///////////////////////
const readerController = require('../controller/readerController');
const adminController = require('../controller/adminController');

//////User Routes///////////////////
router.post('/signup', readerController.readerSignup);

module.exports = router;