'use strict';

var express = require('express');
var people = express();

var router = require('./router');

people.use(router);

module.exports = people;