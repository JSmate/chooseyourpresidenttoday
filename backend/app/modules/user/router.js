'use strict';

var router = require('express').Router();
var ensureAuthenticated = require('./middlewares/EnsureAuthenticated.middleware');

var userController = require('./controllers/User.controller');

var facebookProvider = require('./login-providers/facebook.provider');
var googleProvider = require('./login-providers/google.provider');

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
router.get('/api/me', ensureAuthenticated, userController.getMe);

/*
 |--------------------------------------------------------------------------
 | GET /api/users/search/name
 |--------------------------------------------------------------------------
 */
router.get('/api/users/search/:name', userController.search);

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
router.put('/api/me', ensureAuthenticated, userController.putMe);

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
router.post('/api/auth/signup', userController.signUp);

/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
router.post('/api/auth/facebook', facebookProvider);

/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
router.post('/api/auth/google', googleProvider);

/*
 |--------------------------------------------------------------------------
 | Unlink Provider
 |--------------------------------------------------------------------------
 */
router.post('/api/auth/unlink', ensureAuthenticated, userController.unlink);

module.exports = router;