const express = require('express');
const rescue = require('express-rescue');
const { showMessages } = require('../controllers');

const router = express.Router();

router.get('/', rescue(showMessages));

module.exports = router;
