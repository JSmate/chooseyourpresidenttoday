'use strict';

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var glob = require('glob');
var mongoose = require('mongoose');

var config = require('./config');

var router = require('./router');
var errorMiddleware = require('./middlewares/ErrorMiddleware');
var corsMiddleware = require('./middlewares/CorsMiddleware');

var user = require('./modules/user');

mongoose.connect('mongodb://wuzel-api:12345@ds035603.mongolab.com:35603/wuzel');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(corsMiddleware);

app.use(router);
app.use(user);
app.use('/api', errorMiddleware);

app.use(function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;