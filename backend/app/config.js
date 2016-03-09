'use strict';

var cfg = {
    mongo: {
        user: '',
        password: '',
        url: ''
    }
};

module.exports = {
    config: cfg,
    dbConnection: 'mongodb://' + cfg.mongo.user + ':' + cfg.mongo.password + '@' + cfg.mongo.url,
    'TOKEN_SECRET': '',

    'FACEBOOK_APP_ID': '',
    'FACEBOOK_SECRET': '',
    'GOOGLE_SECRET': ''
};