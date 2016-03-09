'use strict';

var router = require('express').Router();
var candidateController = require('./controllers/CandidateController');

router.route('/api/candidate')
    .get(candidateController.query)
    .post(candidateController.create);

module.exports = router;