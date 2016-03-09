'use strict';

var express = require('express');
var candidate = express();

var router = require('./router');

candidate.use(router);

module.exports = candidate;