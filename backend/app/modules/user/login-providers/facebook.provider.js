'use strict';

var config = require('../../../config');
var jwt = require('jwt-simple');
var User = require('../models/User');
var jwtHelper = require('../helpers/JWT.helper');
var request = require('request');
var moment = require('moment');

module.exports = function(req, res) {
    var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.3/me';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId, // jshint ignore:line
        client_secret: config.FACEBOOK_SECRET, // jshint ignore:line
        redirect_uri: req.body.redirectUri // jshint ignore:line
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({ message: accessToken.error.message });
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: profile.error.message });
            }
            if (req.headers.authorization) {
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
                    }
                    var token = req.headers.authorization.split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.facebook = profile.id;
                        user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            var token = jwtHelper.createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        var token = jwtHelper.createJWT(existingUser);
                        return res.send({ token: token });
                    }
                    var user = new User();
                    user.facebook = profile.id;
                    user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.displayName = profile.name;
                    user.save(function() {
                        var token = jwtHelper.createJWT(user);
                        res.send({ token: token });
                    });
                });
            }
        });
    });
};