'use strict';

var express = require('express');

var user = express();

var router = require('./router');

user.use(router);

module.exports = user;