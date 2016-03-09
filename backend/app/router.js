'use strict';

var router = require('express').Router();
var indexController = require('./controllers/IndexController');
var apiController = require('./controllers/ApiController');

router.get('/', indexController.index);
router.all('/api', apiController.index);

module.exports = router;
