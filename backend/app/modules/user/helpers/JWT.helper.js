'use strict';

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */

var config = require('../../../config');
var moment = require('moment');

module.exports = {
    createJWT: function (user) {
        var jwt = require('jwt-simple');

        var payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.TOKEN_SECRET);
    }
};