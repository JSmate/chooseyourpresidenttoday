'use strict';

var User = require('../models/User');
var jwtHelper = require('../helpers/JWT.helper');

module.exports = {
    /**
     * @api {get} /user/me:id Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "John",
     *       "lastname": "Doe"
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    getMe: function (req, res) {
        console.log(req.user);
        User.findById(req.user, function (err, user) {
            if (err) {
                res.send(err);
            }
            console.log(user);
            res.send(user);
        });
    },

    /**
     * @swagger
     * path: /login
     * operations:
     *   -  httpMethod: POST
     *      summary: Login with username and password
     *      notes: Returns a user based on username
     *      responseClass: User
     *      nickname: login
     *      consumes:
     *        - text/html
     *      parameters:
     *        - name: username
     *          description: Your username
     *          paramType: query
     *          required: true
     *          dataType: string
     *        - name: password
     *          description: Your password
     *          paramType: query
     *          required: true
     *          dataType: string
     */
    search: function (req, res) {
        var name = req.params.name;
        console.log(name);
        var regexp =  new RegExp('.*('+ name + ').*', 'i');
        User.find({'displayName': {$regex: regexp}}, function (err, users) {
            if (err) {
                res.send(err);
            }
            console.log(users);

            res.send(users);
        });
    },
    putMe: function (req, res) {
        User.findById(req.user, function (err, user) {
            if (!user) {
                return res.status(400).send({message: 'User not found'});
            }
            user.displayName = req.body.displayName || user.displayName;
            user.email = req.body.email || user.email;
            user.save(function (err) {
                res.status(200).end();
            });
        });
    },
    signUp: function (req, res) {
        User.findOne({email: req.body.email}, function (err, existingUser) {
            if (existingUser) {
                return res.status(409).send({message: 'Email is already taken'});
            }
            var user = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password: req.body.password
            });
            user.save(function () {
                res.send({token: jwtHelper.createJWT(user)});
            });
        });
    },
    unlink: function (req, res) {
        var provider = req.body.provider;
        var providers = ['facebook', 'foursquare', 'google', 'github', 'instagram',
            'linkedin', 'live', 'twitter', 'twitch', 'yahoo'];

        if (providers.indexOf(provider) === -1) {
            return res.status(400).send({message: 'Unknown OAuth Provider'});
        }

        User.findById(req.user, function (err, user) {
            if (!user) {
                return res.status(400).send({message: 'User Not Found'});
            }
            user[provider] = undefined;
            user.save(function () {
                res.status(200).end();
            });
        });
    }
};
