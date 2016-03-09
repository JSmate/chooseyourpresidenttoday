'use strict';

var Candidate = require('../models/CandidateModel');

module.exports = {
    query: function (req, res) {
        Candidate.find(function (err, people) {
           res.json(people);
        });
    },
    create: function (req, res) {
        console.log(req.body);
        var candidate = new Candidate(req.body);

        candidate.save(function(err) {
            if (err) {

            } else {
                res.json(candidate);
            }
        });
    }
};