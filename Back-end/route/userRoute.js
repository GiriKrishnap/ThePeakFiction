const express = require('express');
const router = express.Router();

/////controller///////////////////////
const readerController = require('../controller/readerController');

//////User Routes///////////////////
router.post('/signup', readerController.readerSignup);
router.post('/login', readerController.readerLogin);

module.exports = router;