const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const tokenValidate = require('../token_validate');

//index page:
router.get('/', controller.index);


module.exports = router;
