'use strict';

var router = require('express').Router();
var personController = require('./controllers/PersonController');

router.route('/api/person')
    .get(personController.query)
    .post(personController.create);

module.exports = router;